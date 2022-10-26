<template>
  <div class="real_info_detail">
    <p class="title">什么是智慧园区，史上最详细的答案来了！</p>
    <div class="title_info">
      <img src="https://scpic.chinaz.net/files/default/imgs/2022-09-26/6da5344d6fa867ca.jpg"/>
      <span class="titleName">小萝莉</span>
      <span class="titleTime">2022-06-30 09:28</span>
      <span class="titleType">政策</span>
    </div>
    <div class="real_info_detail_content">
      <p>智慧园区是指采用新一代通信技术、数字化技术深入应用于园区的管理运营，具备信息迅速采集、信息高速传输、信息快速计算综合运用能力，实现园区内设备管理、资产管理、数据管理、招商租赁、物业服务等数字化运营提高园区产业竞争力促进智慧园区可持续性发展的先进理念。</p>
      <img src="https://scpic.chinaz.net/files/default/imgs/2022-09-26/6da5344d6fa867ca.jpg"/>
      <p>关于什么是智慧园区我们从园区的分类、园区的区别、园区的概念以及园区的基本特征方面进行全方位的介绍，智慧园区是数字化转型实践，联合生态伙伴以人为本实现园区从单一场景智能迈向整体智慧化，使园区业务发展创新，提升运营管理效率。</p>
    </div>
    <div class="content_btn">
      <span class="content_btn_left">上一篇</span>
      <span class="content_btn_right">下一篇</span>
    </div>
    <!-- <div>
      
    </div> -->
  </div>
</template>
<script>
export default {
  name: 'parkInformation',
  setup() {
    const active = ref(0);
    return { active };
  },
  data() {
    return {
      active: 0,
    }
  },
  created(){
    console.log('this.$route.params >>>>',this.$route.query )
  },
  mounted(){
    
  },
  methods: {
    tabClick(title){
      console.log('active>>>>>>',title)
    },
  },
}
</script>
<style lang="scss">
  .real_info_detail{
    padding: 40px 24px 0 24px;
    .title{
      font-size: 34px;
      margin: 0;
      font-weight: 700;
    }
    .title_info{
      margin-top: 24px;
      display: flex;
      align-items: center;
      color: #9296AF;
      font-size: 20px;
      img{
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }
      .titleName{
        margin-left: 8px;
      }
      .titleTime,.titleType{
        margin-left: 24px;
      }
      .titleType{
        color: #6377F5;
      }
    }
    .real_info_detail_content{
      margin-top: 46px;
      font-size: 24px;
      line-height: 48px;
      padding: 0 16px;
      p{
        text-indent: 48px;
        margin: 0;
      }
      img{
        width: 100%;
        border-radius: 12px;
        margin: 32px 0;
      }
    }
    .content_btn{
      margin-top: 24px;
      color: #6377F5;
      font-size: 24px;
      display: flex;
      justify-content: space-between;
    }
  }
</style>