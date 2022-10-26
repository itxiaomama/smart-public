<template>
	<view class="keyboard-wrap" v-if="kbShow">
		<view class="head">
			<view class="done" @tap="done">
				完成 <text class="iconfont iconxiala-"></text>
			</view>
		</view>
		
		<view class="key-list">
			<view class="colspan" :class="{'active' : index === currentIndex }" v-for="(item, index) in keyboardList" :key="index">
				<view class="uni-flex" v-for="(secondItem, secondIndex) in item" :key="secondIndex">
					<view class="item" :class="{'disable': thridItem.split(',')[1] == 'f'}" v-for="(thridItem, thridIndex) in secondItem" :key="thridIndex"
					 @tap.stop="touchstartActive(thridItem)">
						<view class="content">
							{{thridItem.split(',')[0]}}
						</view>
					</view>
				</view>
			</view>
			<!-- 删除键 -->
			<view class="item del-item" @tap.stop="del">
				<view class="content">
					<text class="iconfont iconshanchu1"></text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				keyboardList: [], 		//键盘类型
				currentIndex: 0 		//键盘区当前下标
			}
		},
		props: ['kbIndex', 'kbType', 'kbShow'],
		mounted() {
			this.keyboardList = [
				[
					['京', '粤', '津', '晋', '冀', '蒙', '辽', '吉', '黑', '渝'],
					['苏', '浙', '皖', '闽', '赣', '鲁', '鄂', '沪', '宁'],
					['桂', '琼', '川', '贵', '云', '藏', '陕', '新'],
					[ '豫', '湘', '青', '甘'],
				],
				[
					['1,f', '2,f', '3,f', '4,f', '5,f', '6,f', '7,f', '8,f', '9,f', '0,f'],
					['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I,f', 'O,f', 'P'],
					['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ''],
					['Z', 'X', 'C', 'V', 'B', 'N', 'M', '', '', ''],
				],
				[
					['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
					['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I,f', 'O,f', 'P'],
					['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ''],
					['Z', 'X', 'C', 'V', 'B', 'N', 'M', '', '', ''],
				],
				[
					['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
					['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I,f', 'O,f', 'P'],
					['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ''],
					['Z', 'X', 'C', 'V', 'B', 'N', 'M', '', '', ''],
				],
				[
					['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
					['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I,f', 'O,f', 'P'],
					['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ''],
					['Z', 'X', 'C', 'V', 'B', 'N', 'M', '', '', ''],
				],
				[
					['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
					['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I,f', 'O,f', 'P'],
					['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ''],
					['Z', 'X', 'C', 'V', 'B', 'N', 'M', '', '', ''],
				],
				[
					['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
					['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I,f', 'O,f', 'P'],
					['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '警'],
					['Z', 'X', 'C', 'V', 'B', 'N', 'M', '学', '', ''],
				],
				[
					['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
					['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I,f', 'O,f', 'P'],
					['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ''],
					['Z', 'X', 'C', 'V', 'B', 'N', 'M', '', '', ''],
				]
			]
		},
		watch:{
			//获取键盘区域下标
			kbIndex: {
				immediate: true,
				handler (res) {
					//转为数字类型，防止数据类型不能匹配
					this.currentIndex = Number(res);
				}
			}
		},
		methods: {
			done(){
				this.kbShow = true;
				this.$emit('childClose', '');
			},
			//删除
			del(){
				this.$emit('childDel', this.currentIndex);
				if(this.currentIndex == 0){
					return;
				}
				this.currentIndex --;
				this.$emit('childIndex', this.currentIndex);
			},
			//点击事件
			touchstartActive(res) {
				//键盘包含f字符不执行
				if(res.split(',')[1] == 'f' || res == ''){
					return;
				}
				this.$emit('childValue', res);
				if(this.currentIndex == this.keyboardList.length - 1){
					return
				}
				this.currentIndex ++;
				this.$emit('childIndex', this.currentIndex);
			}
		}
	}
</script>



