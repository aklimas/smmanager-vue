<template>
    <v-card elevation="10" rounded="md">
                <v-card-item class="pb-sm-8 pb-6 pricing">
                    <div class="pricing-item">
                        <h3>{{ card.name }}</h3>
                        <p class="description">{{ card.description }}</p>
                        <h4><sup>zł</sup>{{ card.price }}<span> / miesiąc</span></h4>
                        <v-btn color="primary" class="w-100 px-4" @click="buy(card)">Kup</v-btn>
                        <ul>
                            <template v-for="(feature, key) in features">
                                <template v-if="getFeature(card.features, key)">
                                    <li>
                                        <i class="mdi mdi-check"></i> <span>{{ feature }}</span>
                                    </li>
                                </template>
                                <template v-else>
                                    <li class="na">
                                        <i class="mdi mdi-close"></i> <span>{{ feature }}</span>
                                    </li>
                                </template>
                            </template>
                        </ul>
                    </div>
                </v-card-item>
            </v-card>
  </template>
  
  <script>
  export default {
    name: 'PackageCard',
    props: {
      card: {
        type: Object,
        required: true
      },
      features: {
        type: Array,
        required: true
      }
    },
    methods: {
      buy(card) {
        this.$emit('buy', card);
      },

      getFeature(features, key) {
            if (features.find((i) => i === key) === undefined) {
                return false;
            } else {
                return true;
            }
        },
    }
  };
  </script>
  
  <style scoped lang="scss">
  /*--------------------------------------------------------------
# Pricing Section
--------------------------------------------------------------*/
.pricing .pricing-item {
    background-color: rgba(var(--accent-color-rgb), 0.04);
    padding: 40px 40px;
    height: 100%;
    border-radius: 15px;
}

.pricing h3 {
    font-weight: 600;
    margin-bottom: 15px;
    font-size: 20px;
}

.pricing h4 {
    color: var(--accent-color);
    font-size: 48px;
    font-weight: 700;
    font-family: var(--heading-font);
    margin-bottom: 0;
}

.pricing h4 sup {
    font-size: 28px;
}

.pricing h4 span {
    color: rgba(var(--default-color-rgb), 0.5);
    font-size: 18px;
    font-weight: 500;
}

.pricing .description {
    font-size: 14px;
}

.pricing .cta-btn {
    background-color: var(--default-color);
    color: var(--contrast-color);
    display: block;
    text-align: center;
    padding: 10px 35px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 500;
    font-family: var(--heading-font);
    transition: 0.3s;
    margin-top: 20px;
    margin-bottom: 6px;
}

.pricing .cta-btn:hover {
    background: var(--accent-color);
    color: var(--contrast-color);
}

.pricing ul {
    padding: 0;
    list-style: none;
    color: rgba(var(--default-color-rgb), 0.7);
    text-align: left;
    line-height: 20px;
}

.pricing ul li {
    padding: 10px 0;
    display: flex;
    align-items: center;
}

.pricing ul li:last-child {
    padding-bottom: 0;
}

.pricing ul i {
    color: #059652;
    font-size: 24px;
    padding-right: 3px;
}

.pricing ul .na {
    color: rgba(var(--default-color-rgb), 0.4);
}

.pricing ul .na i {
    color: rgba(var(--default-color-rgb), 0.4);
}

.pricing ul .na span {
    text-decoration: line-through;
}

.pricing .featured {
    position: relative;
}

.pricing .featured .popular {
    position: absolute;
    top: 15px;
    right: 15px;
    background-color: var(--accent-color);
    color: var(--contrast-color);
    padding: 5px 15px;
    margin: 0;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 400;
}

.pricing .featured .cta-btn {
    background: var(--accent-color);
    color: var(--contrast-color);
}

@media (max-width: 992px) {
    .pricing .box {
        max-width: 60%;
        margin: 0 auto 30px auto;
    }
}

@media (max-width: 767px) {
    .pricing .box {
        max-width: 80%;
        margin: 0 auto 30px auto;
    }
}

@media (max-width: 420px) {
    .pricing .box {
        max-width: 100%;
        margin: 0 auto 30px auto;
    }
}
  </style>