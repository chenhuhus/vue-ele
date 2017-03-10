<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :class="{ 'current': currentIndex === index }" @click="selectMenu(index, $event)">
        <span class="text border-1px">
          <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
        </span>
        </li>
      </ul>
    </div>

    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list" ref="foodList">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <shopcart :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>

    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import Shopcart from 'components/shopcart/Shopcart'
  import Cartcontrol from 'components/cartcontrol/Cartcontrol'
  import Food from 'components/food/Food'

  const ERR_OK = 0

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods () {
        let goods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              goods.push(food)
            }
          })
        })
        return goods
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']

      this.$http.get('/api/goods').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.goods = response.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
    },
    methods: {
      selectFood (food, event) {
        if (!event._constructed) {
          return
        }
        this.selectedFood = food
        this.$refs.food.show()
      },
      selectMenu (index, event) {
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodList
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
        // console.log(index)
      },
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })

        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        })

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight () {
        let foodList = this.$refs.foodList
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height = height + item.clientHeight
          this.listHeight.push(height)
        }
      }
    },
    components: {
      Shopcart,
      Cartcontrol,
      Food
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	@import "../../common/scss/mixin";

	.goods {
		display: flex;
		position: absolute;
		top: 174px;
		bottom: 46px;
		width: 100%;
		overflow: hidden;

		.menu-wrapper {
			flex: 0 0 80px;
			width: 80px;
			background: #F3F5F7;

			.menu-item {
				display: table;
				height: 50px;
				width: 56px;
				line-height: 14px;
				font-size: 0;
				padding: 0 12px;
        &.current {
          position: relative;
          margin-top: -1px;
          z-index: 10;
          font-weight: 700;
          background: #fff;

          .text {
            @include border-none;
          }
        }

				.icon {
					display: inline-block;
					vertical-align: top;
					width: 12px;
					height: 12px;
					margin-right: 2px;
					background-repeat: no-repeat;
					background-size: 12px 12px;

					&.decrease {
						@include bg-image('decrease_3');
					}
					&.discount {
						@include bg-image('discount_3');
					}
					&.guarantee {
						@include bg-image('guarantee_3');
					}
					&.invoice {
						@include bg-image('invoice_3');
					}
					&.special {
						@include bg-image('special_3');
					}
				}

				.text {
					display: table-cell;
					width: 56px;
					vertical-align: middle;
					font-size: 12px;
					@include border-1px(rgba(7, 17, 27, 0.2));
				}
			}
		}

		.foods-wrapper {
			flex: 1;

      .title {
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #D9DDE1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background: #F3F5F7;
      }

      .food-item {
        display: flex;
        margin: 18px 18px 0 18px;
        padding-bottom: 18px;
        @include border-1px(rgba(7, 17, 27, 0.2));

        &:last-child {
          @include border-none();
        }

        .icon {
          flex: 0 0 57px;
          margin-right: 10px;
        }

        .content {
          flex: 1;

          .name {
            margin: 2px 0 8px 0;
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }

          .desc, .extra {
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }

          .desc {
            margin-bottom: 8px;
            line-height: 12px;
          }

          .extra {
            .count {
              margin-right: 12px;
            }
          }

          .price {
            font-weight: 700;
            line-height: 24px;

            .now {
              margin-right: 8px;
              font-size: 14px;
              color: rgb(240, 20, 20);
            }

            .old {
              text-decoration: line-through;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }

          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 2px;
          }
        }
      }
		}
	}
</style>
