<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img width="64" height="64" v-bind:src="seller.avatar">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}} / {{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="support">
					<span class="icon" v-bind:class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="support-count" v-on:click="showDetail">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper" v-on:click="showDetail">
			<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img v-bind:src="seller.avatar" width="100%" height="100%">
		</div>
		<transition name="fade">
			<div v-show="detailShow" class="detail">
	      <div class="detail-wrapper clearfix">
	        <div class="detail-main">
	          <h1 class="name">{{seller.name}}</h1>
	          <div class="star-wrapper">
	          	<star :score="4.8" :size="48"></star>
	          </div>
	          <div class="title">
	          	<div class="line"></div>
	          	<div class="text">优惠信息</div>
	          	<div class="line"></div>
	          </div>
	          <ul v-if="seller.supports" class="supports">
	          	<li class="support-item" v-for="item in seller.supports">
	          		<span class="icon" v-bind:class="classMap[item.type]"></span>
	          		<span class="text">{{item.description}}</span>
	          	</li>
	          </ul>
	          <div class="title">
	          	<div class="line"></div>
	          	<div class="text">商家公告</div>
	          	<div class="line"></div>
	          </div>
	          <div class="bulletin">
	          	<p class="content">{{seller.bulletin}}</p>
	          </div>
	        </div>
	      </div>
	      <div class="detail-close" v-on:click="hideDetail">
	        <i class="icon-close"></i>
	      </div>
	    </div>
    </transition>
	</div>
</template>

<script type="text/ecmascript-6">
  import Star from 'components/star/Star'

  export default {
    data () {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail () {
        this.detailShow = true
      },
      hideDetail () {
        this.detailShow = false
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    },
    components: {
      Star
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	@import "../../common/scss/mixin";

	.header {
		position: relative;
		color: #fff;
		background: rgba(7, 17, 27, 0.5);
		overflow: hidden;

		.content-wrapper {
			position: relative;
			padding: 24px 12px 18px 24px;
			font-size: 0;

			.avatar {
				display: inline-block;
				vertical-align: top;

				img {
					border-radius: 2px;
				}
			}

			.content {
				display: inline-block;
				margin-left: 16px;

					.title{
						margin: 2px 0 8px 0;

						.brand {
							display: inline-block;
							vertical-align: top;
							width: 30px;
							height: 18px;
							@include bg-image('brand');
							background-size: 30px 18px;
							background-repeat: no-repeat;
						}

						.name {
							margin-left: 6px;
							font-size: 16px;
							line-height: 18px;
							font-weight: bold;
						}
					}

					.description {
						margin-bottom: 10px;
						font-size: 12px;
						line-height: 12px;
					}

					.support{
						.icon {
							display: inline-block;
							vertical-align: top;
							width: 12px;
							height: 12px;
							margin-right: 4px;
							background-repeat: no-repeat;
							background-size: 12px 12px;

							&.decrease {
								@include bg-image('decrease_1');
							}
							&.discount {
								@include bg-image('discount_1');
							}
							&.guarantee {
								@include bg-image('guarantee_1');
							}
							&.invoice {
								@include bg-image('invoice_1');
							}
							&.special {
								@include bg-image('special_1');
							}
						}
						.text {
							line-height: 12px;
							font-size: 10px;
						}
					}
			}

			.support-count {
				position: absolute;
				right: 12px;
				bottom: 14px;
				padding: 0 8px;
				height: 24px;
				line-height: 24px;
				border-radius: 14px;
				background: rgba(0, 0, 0, 0.2);
				text-align: center;

				.count {
					vertical-align: top;
					font-size: 10px;
				}

				.icon-keyboard_arrow_right {
					margin-left: 2px;
					font-size: 10px;
					line-height: 24px;
				}
			}
		}

		.bulletin-wrapper {
			position: relative;
			padding: 0 22px 0 12px;
			height: 28px;
			line-height: 28px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			background: rgba(7, 17, 27, 0.2);

			.bulletin-title {
				display: inline-block;
				vertical-align: top;
				margin-top: 8px;
				width: 22px;
				height: 12px;
				@include bg-image('bulletin');
				background-repeat: no-repeat;
				background-size: 22px 12px;
			}

			.bulletin-text {
				vertical-align: top;
				margin: 0 4px;
				font-size: 10px;
			}

			.icon-keyboard_arrow_right {
				position: absolute;
				font-size: 10px;
				right: 12px;
				top: 8px;
			}
		}

		.background {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
			filter: blur(10px);
		}

		.detail {
			position: fixed;
			z-index: 100;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			overflow: auto;
			background: rgba(7, 17, 27, 0.8);
			backdrop-filter: blur(10px);

      .detail-wrapper {
        min-height: 100%;
        width: 100%;

        .detail-main {
          margin-top: 64px;
          padding-bottom: 64px;

          .name {
            line-height: 16px;
            font-size: 16px;
            font-weight: 700;
            text-align: center;
          }

          .star-wrapper {
          	margin-top: 16px;
          	padding: 2px 0;
          	text-align: center;
          }

          .title {
          	display: flex;
          	width: 80%;
          	margin: 28px auto 24px auto;

          	.line {
          		position: relative;
          		top: -6px;
          		flex: 1;
          		border-bottom: 1px solid rgba(225,225,225,0.2);
          	}

          	.text {
          		padding: 0 12px;
          		font-weight: 700;
          		font-size: 14px;
          	}
          }

          .supports {
          	width: 80%;
          	margin: 0 auto;

          	.support-item {
          		padding: 0 12px;
          		font-size: 0;
          		&:not(:last-child) {
          			margin-bottom: 12px;
          		}

          		.icon {
          			display: inline-block;
          			vertical-align: top;
          			margin-right: 6px;
          			width: 16px;
          			height: 16px;
          			background-size: 16px 16px;
          			background-repeat: no-repeat;

          			&.decrease {
									@include bg-image('decrease_2');
								}
								&.discount {
									@include bg-image('discount_2');
								}
								&.guarantee {
									@include bg-image('guarantee_2');
								}
								&.invoice {
									@include bg-image('invoice_2');
								}
								&.special {
									@include bg-image('special_2');
								}
          		}

          		.text {
          			font-size: 12px;
          			line-height: 16px;
          		}
          	}
          }

          .bulletin {
          	width: 80%;
          	margin: 0 auto;

          	.content {
          		padding: 0 12px;
          		font-size: 12px;
          		line-height: 24px;
          	}
          }
        }
      }

      .detail-close {
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;
        clear: both;
        font-size: 32px;
      }
		}

		.fade-enter, .fade-leave-active {
			opacity: 0;
		}

		.fade-enter-active, .fade-leave-active {
			transition: opacity 0.5s;
		}
	}
</style>
