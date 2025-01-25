<script>
import { packagesStore } from '@/stores/core/packages';
import { useAuthStore } from '@/stores/auth';
import { errorMessage, successMessage } from '@/stores/notifications';

export default {
    name: 'PaymentListCard',
    data: function() {
        return {
            breadcrumbs: [
                {
                    text: 'Panel',
                    disabled: false,
                    href: '#'
                },
                {
                    text: 'Karta',
                    disabled: true,
                    href: '#'
                }
            ],
            store: packagesStore(),

            cards: [],

            showForm:false,
            saveCard: false,
            loading: true // Dodano loading
        };
    },
    async created() {
        console.log('created hook'); // Dodano log
        await this.fetchListCard();
    },
    async mounted() {
        console.log('mounted hook'); // Dodano log
        await this.fetchListCard();
        this.loading = false;

        // Inicjalizacja PayU SDK
        const script = document.createElement('script');
        script.src = 'https://secure.snd.payu.com/javascript/sdk';
        script.onload = this.initializePayU;
        document.head.appendChild(script);

        // Inicjalizacja FingerprintJS
        const fingerprintScript = document.createElement('script');
        fingerprintScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/fingerprintjs2/2.1.2/fingerprint.min.js';
        fingerprintScript.onload = this.initializeFingerprint;
        document.head.appendChild(fingerprintScript);
    },
    methods: {
        async fetchListCard() {
            console.log('fetchListCard method'); // Dodano log
            try {
                const response = await this.store.fetchListCard();
                if (response && response) {
                    this.cards = response;
                    console.log('Cards fetched:', this.cards); // Dodano log
                }
            } catch (error) {
                console.error('Błąd podczas pobierania listy kart:', error);
            }
        },
        async addPayMethod(maskedCard, token) {
            try {
                await this.store.addPayMethod({ maskedCard, token });
                console.log(`Dodano kartę ${maskedCard}`);
                await this.fetchListCard(); // Odświeżenie listy kart
                this.clearForm(); // Czyszczenie formularza
            } catch (error) {
                console.error('Błąd podczas dodawania karty:', error);
            }
        },
        initializePayU() {
            const optionsForms = {
                cardIcon: true,
                style: {
                    basic: {
                        fontSize: "24px",
                    },
                },
                placeholder: {
                    number: "",
                    date: "MM/YY",
                    cvv: "",
                },
                lang: "pl",
            };

            const renderError = function (element, errors) {
                element.className = "response-error";
                const messages = errors.map(error => error.message);
                element.innerText = messages.join(", ");
            };

            const renderSuccess = function (element, msg) {
                element.className = "response-success";
                element.innerText = msg;
            };

            const payuSdkForms = PayU("487016", { environment: "sandbox" }); // Podaj swój POS ID
            const secureForms = payuSdkForms.secureForms();

            const cardNumber = secureForms.add("number", optionsForms);
            const cardDate = secureForms.add("date", optionsForms);
            const cardCvv = secureForms.add("cvv", optionsForms);

            cardNumber.render("#payu-card-number");
            cardDate.render("#payu-card-date");
            cardCvv.render("#payu-card-cvv");

            const tokenizeButton = document.getElementById("tokenizeButton");
            const responseElement = document.getElementById("responseTokenize");

            tokenizeButton.addEventListener("click", async () => {
                responseElement.innerText = "";

                try {
                    payuSdkForms.tokenize("MULTI").then(async (result) => {
                        if (result.status === "SUCCESS") {

                            console.log(result.body);
                            this.addPayMethod(result.body.mask, result.body.token);
                            //renderSuccess(responseElement, "Uzyskany token: " + result.body.token);
                        } else {
                            renderError(responseElement, result.error.messages);
                        }

                        console.log(result);
                    });
                } catch (e) {
                    console.log("Błąd techniczny:", e);
                }
            });
        },
        initializeFingerprint() {
            Fingerprint2.getPromise().then(function(components) {
                const values = components.map(component => component.value);
                const murmur = Fingerprint2.x64hash128(values.join(''), 31);
                console.log(murmur); // Możesz go wykorzystać w dalszej części
            });
        },
        toggleCardOptions(card) {
            card.showOptions = !card.showOptions;
        },

        async setAsDefault(card) {
            try {
                await this.store.setAsDefaultCard(card.id);
                console.log(`Ustawiono kartę ${card.maskedCard} jako domyślną`);
                await this.fetchListCard(); // Odświeżenie listy kart
            } catch (error) {
                console.error('Błąd podczas ustawiania domyślnej karty:', error);
            }
        },
        async removeCard(card) {
            try {
                await this.store.removeCard(card.id);
                console.log(`Usunięto kartę ${card.maskedCard}`);
                await this.fetchListCard(); // Odświeżenie listy kart
            } catch (error) {
                console.error('Błąd podczas usuwania karty:', error);
            }
        },
        clearForm() {
            this.showForm = false;
            this.saveCard = false;
            // Resetowanie innych pól formularza, jeśli istnieją
        },
    }
};
</script>


<template>
    <v-container>
        <v-row  justify="center">
            <v-col cols="12" md="8" lg="6">

                        <strong>Zapisane karty płatnicze</strong>
                        <br>
                        Lista Twoich kart, które możesz wykorzystywać do swoich płatności. 

            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" lg="4" md="6">
            </v-col>
        </v-row>
        <v-row v-if="!showForm" justify="center">
            <v-col cols="12" md="8" lg="6">
                <v-card class="pa-2">
                    <v-card-title class="headline d-flex justify-space-between align-center">
                        <div>
                            <v-icon>mdi-credit-card-outline</v-icon>
                            <span class="text-red-lighten-1">•••• 0000 | MM/YY</span>
                        </div>
                        <v-btn @click="showForm = true" color="success" variant="plain">
                            Dodaj kartę
                        </v-btn>
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-show="showForm" justify="center">
            <v-col cols="12" md="8" lg="6">
                <v-card class="pa-2">
                    <v-card-title class="headline d-flex justify-space-between align-center">
                        <div>
                            <v-icon>mdi-credit-card-outline</v-icon>
                            <span class="text-red-lighten-1">•••• 0000 | MM/YY</span>
                        </div>
                        <v-btn @click="showForm = false" color="success" variant="plain">
                            Anuluj
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <div class="card-container">
                            <aside>Numer karty</aside>
                            <div class="payu-card-form" id="payu-card-number"></div>

                            <div class="card-details clearfix">
                                <div class="expiration">
                                    <aside>Data ważności</aside>
                                    <div class="payu-card-form" id="payu-card-date"></div>
                                </div>

                                <div class="cvv">
                                    <aside>CVV</aside>
                                    <div class="payu-card-form" id="payu-card-cvv"></div>
                                </div>
                            </div>
                        </div>
                        <v-card-subtitle class="mt-4">
                            <v-checkbox v-model="saveCard" class="checkbox-top">
                                <template v-slot:label>
                                    <div>
                                        <strong>Zapisz kartę do przyszłych zakupów.</strong>
                                        <br>
                                        To nie wpłynie na sposób płatności za istniejące subskrypcje i może być zarządzane w dowolnym momencie na stronie Twojego konta.
                                    </div>
                                </template>
                            </v-checkbox>
                        </v-card-subtitle>
                        <v-btn :disabled="!saveCard" id="tokenizeButton" color="primary" class="mt-4">Zapisz</v-btn>
                        <div id="responseTokenize" class="mt-4"></div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-for="card in cards" :key="card.id" justify="center">
            <v-col cols="12" md="8" lg="6">
                <v-card>
                    <v-card-title class="headline d-flex justify-space-between align-center">
                        <div>
                            <v-icon>mdi-credit-card-outline</v-icon>
                            <span class="text-red-lighten-1">{{ card.maskedCard }}</span>
                        </div>
                        <div class="d-flex align-center">
                            <v-icon v-if="card.isDefault" color="success">mdi-check-circle</v-icon>
                            <v-btn @click="toggleCardOptions(card)" color="success" variant="plain">
                                Zmień
                            </v-btn>
                        </div>
                    </v-card-title>
                    <v-card-text v-if="card.showOptions">
                        <v-btn v-if="!card.isDefault" variant="plain" @click="setAsDefault(card)" color="primary" class="mt-2">Ustaw jako domyślną</v-btn>
                        <v-btn @click="removeCard(card)" variant="plain" color="error" class="mt-2">Usuń kartę</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.card-container {
    width: 100%;
    margin: 0 auto;
    border-radius: 6px;
    padding: 10px;
    text-align: left;
    box-sizing: border-box;
}

.card-container aside {
    padding-bottom: 6px;
}

.payu-card-form {
    background-color: #ffffff;
    padding: 5px;
    border-radius: 4px;
}

.card-details {
    clear: both;
    overflow: auto;
    margin-top: 10px;
}

.card-details .expiration {
    width: 50%;
    float: left;
    padding-right: 5%;
}

.card-details .cvv {
    width: 45%;
    float: left;
}

.response-success {
    color: #438f29;
}

.response-error {
    color: #990000;
}
</style>