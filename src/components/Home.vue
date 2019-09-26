<template>
  <div class="content" v-loading="loading">
    <el-container class="content">
      <el-header style="height:40px;padding:0">
        <!-- <div class="search">
          <i class="el-icon-zoom-in" style="font-size: 24px;color:#fff;vertical-align: middle;"></i>
          <span style="font-size: 16px;color: #fff;">患者检索</span>
          <div v-on:click.prev.stop="searchShow=true" style="display: inline-block;">
            <el-input v-model="form.queryKeywords" placeholder="姓名/(住院、门诊)号/床位号" clearable size="small"
                      v-on:input="querytable"></el-input>
          </div>
        </div> -->
        <div class="head">患者基本信息</div>

      </el-header>


      <el-container class="area">
        <!--菜单-->
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu :unique-opened="true" :router="true">
            <el-menu-item index=""  @click="openWin(0)">
              <i class="fa fa-file-text-o b409EFF"></i>
              <span slot="title">病历全息图</span>
            </el-menu-item>
            <el-menu-item index=""  @click="openWin(1)">
              <i class="fa fa-picture-o  b409EFF"></i>
              <span slot="title">医学影像</span>
            </el-menu-item>
            <!-- <el-menu-item index="" @click="openWin(2)">
              <i class="fa fa-medkit b409EFF"></i>
              <span slot="title">检验</span>
            </el-menu-item>
            <el-menu-item index="3"  route="/doctorOrder">
                <i class="fa fa-pencil-square-o b409EFF"></i>
                <span slot="title">医嘱</span>
            </el-menu-item> -->
          </el-menu>
        </el-aside>
        <!--主体-->
        <el-main style="background: #fff">
          <div class="baseInfo">
            <div class="img">
              <i class="fa fa-user"></i>
              <img src="" alt="">
            </div>
            <div class="info">
              <p>
                <span>姓名:{{baseInfo.name}}</span>
                <span>生日:{{baseInfo.birthday}}</span>
                <span>性别:{{baseInfo.sexName}}</span>
                <span>年龄:{{baseInfo.age}}</span>
                <span>婚姻:{{baseInfo.marriageStateName}}</span>
                <span>名族:{{baseInfo.nationName}}</span>
              </p>
              <p style="font-size: 12px;">
                <span>医保类型:{{baseInfo.marriageStateName}}</span>
                <span>身份证:{{baseInfo.idCard}}</span>
                <span><i class="fa fa-phone-square"></i> 电话:{{baseInfo.phone}}</span>
                <span><i class="fa fa-address-book"></i> 住址:{{baseInfo.countryName}}{{baseInfo.addrProvince}}{{baseInfo.addrCity}}{{baseInfo.addrArea}}{{baseInfo.addrDetail}}</span>
              </p>
            </div>
          </div>
          <div class="timeAxis">
            <timeAxis :list="empiList"></timeAxis>
          </div>
          <div style="padding-top: 10px;">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </div>

        </el-main>
      </el-container>
    </el-container>

   
  </div>
</template>

<script>
  import getURLParam from '../libs/getURLParam'
  import timeAxis from './time/timeAxis.vue'
  import {mapGetters } from 'vuex'

  

  export default {
    name: "Home",
    components: {
      timeAxis
    },

    computed:{
      ...mapGetters(
        [ 'getCodeEmpi',
        'getCodeVisitType',
        'getCodePatientId',
        'getCodeInpatientId',
        'getCodeInHospitalId']
      )
    },

    created() {
      //查询参数获取
      this.patientParam.callType = this.$route.query.callType;
      this.patientParam.visitType = this.$route.query.visitType;
      this.patientParam.patientId = this.$route.query.patientId;
      this.patientParam.inpatientId = this.$route.query.inpatientId;
      this.patientParam.inHospitalId = this.$route.query.inHospitalId;
      this.patientParam.idCard = this.$route.query.idCard;
      if(!this.patientParam.patientId && !this.patientParam.inpatientId
         && !this.patientParam.inHospitalId && !this.patientParam.idCard) {
          this.$message({
            message: '请求参数缺失!',
            type: 'warning'
          });
          return;
      }
      this.loading = true;
      let self = this;
      this.axios({
        method: "POST",
        url: "/api/v2/patient/patientView",
        data: {
          data: this.patientParam,
          page: {
            pageNum: this.page.pageNum,
            pageSize: 20,
          }
        }
      }).then(function (res) {
        res = res.data;
        self.empiList = res.data;
        // self.baseInfo = self.currentData;
        self.loading = false;
        self.searchShow = false;
        if(res.data && res.data.length>0) {
          self.baseInfo = Object.assign({}, res.data[0])
          console.log(res.data[0])
        }
      })
    },
    data() {
      return {
        patientParam: {
            callType: null,
            visitType: null,
            // 患者id
            patientId: null,
            //患者inpatientId
            inpatientId: null,
            //住院号、门诊号
            inHospitalId: null,
            //身份证
            idCard: null,
            //医保卡
            yibaoCard: null,
        },
        loading: false,   
        baseInfo: {
          "updateTime": null,
          "createTime": null,
          "modifyBy": null,
          "createBy": null,
          "orderCond": null,
          "extSQL": null,
          "visitCorp": "",
          "visitCorpName": null,
          "visitType": "",
          "inHospitalDate": "",
          "inHospitalId": "",
          "bedId": null,
          "inDeptName": "",
          "outDeptName": "",
          "outHospitalDate": "",
          "diagName": "",
          "diagBasis": null,
          "empi": "",
          "name": "",
          "sexName": "",
          "birthday": "",
          "idCard": null,
          "age": null,
          "countryName": null,
          "nationName": null,
          "eduDegree": null,
          "jobName": null,
          "marriageStateName": null,
          "phone": null,
          "addrProvince": null,
          "addrCity": null,
          "addrArea": null,
          "addrDetail": null
        },
        currentData: {},
        page: {
          total: 0,
          pageNum: 1,
          pageSize: 20,
          pages: ""
        },
        
        searchShow: false,
        empiList: []
      }
    },
    methods: {
      //新窗口
      openWin: function (type) {
        if(this.getCodeInHospitalId==null || this.getCodeInHospitalId=='') {
            this.$message({
              message: '请选择患者ID或者住院号!',
              type: 'warning'
            });
            return;
        }
        switch(type){
          case 1:            
            //医学影像
            var url = 'http://192.168.20.33:8081/ClinicList.aspx?colid0=219$colvalue0='+this.getCodeInHospitalId;
            //console.log("openIE:" + url)
            window.location.href = "openIE:" + url ;// 使用IE打开
            //window.open('http://192.168.20.33:8081/ClinicList.aspx?colid0=219&colvalue0='+this.getCodeInHospitalId)
            break;
          // case 2:
          //   //检验
          //   //window.open('#')
          //   break;
          case 0:
            //病历全息图
            //window.open('http://192.168.20.25:8003/Multis/Index?moduleId=EMR_IN&patientId='+this.getCodeInpatientId.toLowerCase() + '&visitCategory=inVisit&HideHeader=true&HideFooter=true&mode=getData')
            window.open('http://192.168.20.25:8003/multis?patientId='+this.getCodeInpatientId.toLowerCase() + '&type=1')
            break;
          default:
            break
        }
      },

    } //methods

  }
</script>

<style scoped>
  .el-table td, .el-table th {
    padding: 0;
  }

  .content {
    height: 100%;
  }

  .search {
    position: relative;
    padding-left: 15px;
    z-index: 1;
    height: 40px;
    line-height: 40px;
    top: 0
  }

  .search_table {
    position: fixed;
    /*display: none;*/
    width: 720px;
    height: 400px;
    background: #fff;
    top: 40px;
    left: 110px;
    z-index: 999;
    padding: 5px;
    box-shadow: 1px 1px 10px 2px #6f7180;
  }

  .head {
    height: 40px;
    line-height: 40px;
    width: 100%;
    color: #fff;
    font-size: 16px;
    background: #409EFF;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    text-align: center;
    text-indent: 300px;
  }

  .timeAxis {
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc
  }

  .el-input {
    width: auto;
  }

  .area {
    height: calc(100% - 40px);
  }

  .el-aside {
    border-top: 1px solid #ccc
  }

  .el-submenu {
    border-bottom: 1px solid #ccc
  }

  .baseInfo {
    height: 50px;
    /*margin-top: 40px;*/
    margin-bottom: 5px;
    background: #fff;
  }

  .baseInfo .img {
    float: left;
    width: 60px;
    margin-top: 5px;
    background: #ccc;
    border-radius: 5px 5px 0 0;
    text-align: center;
    height: 40px;
    font-size: 32px;
    line-height: 40px;
  }

  .baseInfo .img img {
    display: block;
    height: 100%;
    margin: auto;
  }

  .baseInfo .info {
    float: left;
    height: 50px;
    line-height: 25px;
    padding-left: 10px;
    padding-right: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: calc(100% - 100px);
  }

  .baseInfo .info p {
    font-weight: 500;
    height: 25px;
    font-size: 14px;
  }

  .baseInfo .info span {
    float: left;
    height: 25px;
    display: block;
    padding-right: 20px;
    min-width: 100px;
  }

  .timeAxis {
    height: 280px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    overflow: hidden;
    background: #fff;
  }

  i.b409EFF {
    color: #409EFF
  }
  .el-main{
    padding: 5px;
  }
</style>
