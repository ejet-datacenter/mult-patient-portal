<template>
  <div class="content" v-loading="loading">
    <el-container class="content">
      <el-header style="height:60px;padding:0">
        <div class="search">
          <i class="el-icon-zoom-in" style="font-size: 24px;color:#fff;vertical-align: middle;"></i>
          <span style="font-size: 18px;color: #fff;">患者检索</span>
          <div v-on:click.prev.stop="searchShow=true" style="display: inline-block;">
            <el-input v-model="form.queryKeywords" placeholder="姓名/(住院、门诊)号/床位号" clearable size="small"
                      v-on:input="querytable"></el-input>
          </div>
        </div>
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
                <span>姓名：{{baseInfo.name}}</span>
                <span>生日：{{baseInfo.birthday}}</span>
                <span>性别：{{baseInfo.sexName}}</span>
                <span>年龄：{{baseInfo.age}}</span>
                <span>婚姻：{{baseInfo.marriageStateName}}</span>
                <span>名族：{{baseInfo.nationName}}</span>
              </p>
              <p>
                <span>医保类型：{{baseInfo.marriageStateName}}</span>
                <span>身份证：{{baseInfo.idCard}}</span>
                <span><i class="fa fa-phone-square"></i> 电话：{{baseInfo.phone}}</span>
                <span><i class="fa fa-address-book"></i> 住址：{{baseInfo.countryName}}{{baseInfo.addrProvince}}{{baseInfo.addrCity}}{{baseInfo.addrArea}}{{baseInfo.addrDetail}}</span>
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

    <div class="search_table" v-show="searchShow">
      <el-form ref="form" label-width="80px" size="mini">
        <el-form-item label="关键字:" style="display: inline-block;margin-bottom:5px">
          <el-input v-model="form.queryKeywords" v-on:input="querytable" placeholder="姓名/(住院、门诊)号/床位号"></el-input>
        </el-form-item>
        <el-form-item label="就诊类型:" style="display: inline-block;;margin-bottom:5px">
          <el-checkbox-group v-model="form.visitTypes">
            <el-checkbox label="1">门诊</el-checkbox>
            <el-checkbox label="2">住院</el-checkbox>
            <el-checkbox label="3">急诊</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="开始:" style="display: inline-block;;margin-bottom:5px">
          <el-date-picker
            v-model="form.inHospitalStartTime"
            type="date" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束:" style="display: inline-block;;margin-bottom:5px">
          <el-date-picker
            v-model="form.inHospitalEndTime"
            type="date" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" size="mini" @click="querytable">查询</el-button>
      </el-form>
      <el-table
        highlight-current-row
        @current-change="tableCurrent"
        @row-dblclick="queryInfo"

        :data="tableData"
        height="280px"
        element-loading-text="拼命加载中"
        border
        size="mini"
        style="width: 100%">
        <el-table-column
          fixed
          prop="name"
          label="姓名"
          width="80">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          width="60">
        </el-table-column>
        <el-table-column
          fixed
          prop="inHospitalId"
          label="住院号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="inDeptName"
          label="就诊科室"
          width="120">
        </el-table-column>
        <el-table-column
          prop="visitDoctorName"
          label="诊断医生"
          width="120">
        </el-table-column>
        <el-table-column
          prop="inHospitalDate"
          label="就诊时间">
        </el-table-column>
        <!-- <el-table-column
          prop="outHospitalDate"
          label="出院时间">
        </el-table-column> -->
      </el-table>
      <el-pagination
        style="margin-top: 10px;"
        background
        layout="prev, pager, next,total"
        :total="page.total"
        :page-size="page.pageSize"
        :current-page="page.pageNum"
        @current-change="currentChange">
      </el-pagination>
      <el-button type="default" size="mini" style="position: absolute;bottom: 15px;right: 90px;"
                 @click="searchShow = false">取消
      </el-button>
      <el-button type="primary" size="mini" style="position: absolute;bottom: 15px;right: 10px;" @click="queryInfo">确认
      </el-button>
    </div>
  </div>
</template>

<script>
  import timeAxis from './time/timeAxis'
  import {mapGetters } from 'vuex'

  export default {
    name: "index",
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
    data() {
      return {
        loading: false,
        tableData: [
          // {
          //   "updateTime": null,
          //   "createTime": null,
          //   "modifyBy": null,
          //   "createBy": null,
          //   "orderCond": null,
          //   "extSQL": null,
          //   "visitCorp": "42203707-3",
          //   "visitCorpName": null,
          //   "visitType": "住院",
          //   "inHospitalDate": "2018/07/19 15:49:43",
          //   "inHospitalId": "18111844",
          //   "bedId": null,
          //   "inDeptName": "妇产科",
          //   "outDeptName": "妇产科",
          //   "outHospitalDate": "2018/07/19 15:49:43",
          //   "diagName": "1.羊水过少2.孕39周+4待产",
          //   "diagBasis": null,
          //   "empi": "42203707-3-c9004387d2614ae98c144c947c9f80f5100010",
          //   "name": "王曾英",
          //   "sexName": "女",
          //   "birthday": "1982/06/22",
          //   "idCard": null,
          //   "age": null,
          //   "countryName": null,
          //   "nationName": null,
          //   "eduDegree": null,
          //   "jobName": null,
          //   "marriageStateName": null,
          //   "phone": null,
          //   "addrProvince": null,
          //   "addrCity": null,
          //   "addrArea": null,
          //   "addrDetail": null
          // }
        ],
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
        form: {
          queryKeywords: "",
          inHospitalStartTime: "",
          inHospitalEndTime: "",
          visitTypes: ['1', '2', '3']
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
      currentChange: function (val) {
        this.page.pageNum = val;
        this.querytable();
      },
      tableCurrent: function (val) {
        this.currentData = val;
        // this.querytable();
      },
      querytable: function () {
        let self = this;
        self.tableData = [];
        self.page = {
          total: this.page.total,
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize,
          pages: ""
        };
        // if (this.form.queryKeywords == "") {
        //   return;
        // }
        this.axios({
          method: "POST",
          url: "/api/query-patient",
          data: {
            data: this.form,
            page: this.page
          }
        }).then(function (res) {
          res = res.data;
          self.page = res.page;
          self.tableData = res.data;
        })
      },
      queryInfo: function () {
        this.loading = true;
        let self = this;
        this.axios({
          method: "POST",
          url: "/api/query-patient-visits",
          data: {
            data: {
              "empi": this.currentData.empi
            },
            page: {
              pageNum: this.page.pageNum,
              pageSize: 20,
            }
          }
        }).then(function (res) {
          res = res.data;
          self.empiList = res.data;
          self.baseInfo = self.currentData;
          self.loading = false;
          self.searchShow = false;
        })
      }
    }
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
    height: 60px;
    line-height: 60px;
    top: 0
  }

  .search_table {
    position: fixed;
    /*display: none;*/
    width: 720px;
    height: 400px;
    background: #fff;
    top: 60px;
    left: 120px;
    z-index: 999;
    padding: 20px;
    box-shadow: 1px 1px 10px 2px #6f7180;
  }

  .head {
    height: 60px;
    line-height: 60px;
    width: 100%;
    color: #fff;
    font-size: 22px;
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
    border-top: 0px solid #ccc;
    font-size: 18px;
  }
  .el-aside .el-menu-item {

    font-size: 16px;
  }

  .el-submenu {
    border-bottom: 1px solid #ccc;

  }

  .baseInfo {
    height: 60px;
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
    height: 50px;
    font-size: 32px;
    line-height: 50px;
  }

  .baseInfo .img img {
    display: block;
    height: 100%;
    margin: auto;
  }

  .baseInfo .info {
    float: left;
    height: 60px;
    line-height: 30px;
    padding-left: 10px;
    padding-right: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: calc(100% - 100px);
    font-size: 14px;
  }

  .baseInfo .info p {
    font-weight: 500;
    height: 30px;
    font-size: 14px;
  }

  .baseInfo .info span {
    float: left;
    height: 30px;
    display: block;
    padding-right: 20px;
    min-width: 120px;
  }

  .timeAxis {
    height: 380px;
    width: 100%;
    box-sizing: border-box;
    padding: 20px 10px;
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
