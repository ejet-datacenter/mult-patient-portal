<template>
  <div class="box">
    <ul :style="allWidth">
      <li>
        <i class="fa fa-volume-off"></i>
      </li>
      <li class="border bf79782" v-for="(item,key) in list" :class="{bf79782:key%2 == 0,b1b84cd:key%2 == 1,sel:item.inHospitalId==getCodeInHospitalId}" @click="timeSel(item)" >
        <div class="up" v-if="key%2 == 0">
          <div class="time">{{item.inHospitalDate || ""}}</div>
          <div class="code">{{item.visitTypeName}}号:{{item.inHospitalId || ""}}</div>
          <div>{{item.diagBasis || ""}}</div>
          <div>诊断医生：{{item.visitDoctorName || ""}}</div>
          <div>住院科室：{{item.inDeptName || ""}}</div>
          <div>诊断名称：{{item.diagName || ""}}</div>
        </div>
        <div class="down" v-else>
          <div class="time">{{item.inHospitalDate || ""}}</div>
          <div>{{item.diagBasis || ""}}</div>
          <div>诊断医生：{{item.visitDoctorName || ""}}</div>
          <div>住院科室：{{item.inDeptName || ""}}</div>
          <div>诊断名称：{{item.diagName || ""}}</div>
          <div class="code">{{item.visitTypeName}}号:{{item.inHospitalId || ""}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import store from "../../store"
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    name: "time-axis",
    data(){
      return {
        data:[],
      }
    },
    props:{
      list:{
        type:Array,
        default: function () {
          return []
        }
      }
    },
    computed:{
      ...mapGetters([
        'getCodeEmpi',
        'getCodeVisitType',
        'getCodePatientId',
        'getCodeInpatientId',
        'getCodeInHospitalId'
      ]),
      allWidth:function () {
        if(this.list){
          return {'width':200*(this.list.length+1) + 30 + 'px'}
        }else{
          return {'width':'auto'}
        }

      }
    },
    created:function () {
      if(this.list.length>0){

        this.setCodeEmpi(this.list[0].empi);
        this.setCodeVisitType(this.list[0].visitType);
        this.setCodePatientId(this.list[0].patientId);
        this.setCodeInpatientId(this.list[0].inpatientId);
        this.setCodeInHospitalId(this.list[0].inHospitalId);
        this.setInHos
      }
    },
    methods:{
      ...mapMutations([     
        'setCodeEmpi',
        'setCodeVisitType',
        'setCodePatientId',
        'setCodeInpatientId',
        'setCodeInHospitalId',
      ]),
      timeSel: function (item) {
        
        if(this.getCodeInHospitalId != item.inHospitalId){

          this.setCodeEmpi(item.empi);
          this.setCodeVisitType(item.visitType);
          this.setCodePatientId(item.patientId);
          this.setCodeInpatientId(item.inpatientId);
          this.setCodeInHospitalId(item.inHospitalId);
          //this.$router.push('/doctorOrder');
        }
      }
    }
  }
</script>

<style scoped>
  ul li.sel{
    background: #f8f8f8;
  }
  .box{
    width: 100%;
    overflow-x: auto;
    height:275px;
    position: relative;
    padding-top: 5px;
  }
  .box ul{
    height: 260px;
    width: 3300px;
    position: relative;
    min-width: 100%;
  }
  .box ul li {
    float: left;
    height: 260px;
    width: 200px;
    position: relative;
  }
  .box ul li>div>div{
    font-size: 14px;
  }
  .box ul li:nth-child(1){
    width: 15px;
    font-size: 20px;
    color:#999;
    line-height: 260px;
    border:none;
    z-index: 2;
  }
  .box ul:before {
    z-index: 1;
    position: absolute;
    content:"";
    border-top: 3px dashed #ccc;
    height: 1px;
    width: 100%;
    top: 50%;
    margin-top: -1px;
    left: 0;
  }
  .box ul li.border:before{
    position: absolute;
    content:"";
    height: 16px;
    width: 16px;
    top: 50%;
    margin-top: -8px;
    left: 0;
    background: #f79782;
    border-radius:50%;
    z-index: 3;
  }
  .box ul li.border:after{
    position: absolute;
    content:"";
    height: 10px;
    width: 10px;
    top: 50%;
    margin-top: -5px;
    left: 3px;
    background: #fff;
    border-radius:50%;
    z-index: 4;
  }
  .box ul li>div>div{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .box ul li>div>div>p{
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .box ul li .up{
    height: 125px;
    position: absolute;
    top: -10px;
    width: 100%;
    padding-left: 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    left: 0;
  }

  .box ul li .up:before{
    position: absolute;
    content:"";
    height: 6px;
    width: 6px;
    bottom: -18px;
    margin-top: -3px;
    left: 5px;
    background: #f79782;
    border-radius:50%;
    z-index: 9;
  }
  .box ul li .up:after{
    position: absolute;
    content:"";
    height: 125px;
    width: 3px;
    left: 7px;
    background: #f79782;
    z-index: 9;
    top: 10px;
  }



  .box ul li .down{
    height: 125px;
    position: absolute;
    padding-left: 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    bottom: 0;
    width: 100%;
    left: 0;
  }

  .box ul li .down:before{
    position: absolute;
    content:"";
    height: 6px;
    width: 6px;
    top: -5px;
    margin-top: -3px;
    left: 5px;
    background: #f79782;
    border-radius:50%;
    z-index: 9;
  }
  .box ul li .down:after{
    position: absolute;
    content:"";
    height: 125px;
    width: 3px;
    left: 7px;
    top: 3px;
    background: #f79782;
    z-index: 9;
  }
  .box ul li>div>div{
    line-height: 24px;
  }
  .box ul li .up .code{
    /*position: relative;*/
    margin-left: -15px;
    width: 140px;
    padding-left: 10px;
    height: 26px;
    line-height: 26px;
    font-size: 14px;
    margin-top: 20px;
    background: #f79782;
    border-radius: 5px;
    color: #fff;
    z-index: 10;
  }

  .box ul li .up .time{
    position: absolute;
    height: 16px;
    line-height: 16px;
    color: #FF7F00;
    bottom: -40px;
  }

  .box ul li .down .time{
    position: absolute;
    height: 16px;
    line-height: 16px;
    color: #FF7F00;
    top: -30px;
  }

  .box ul li .down .code{
    width: 140px;
    padding-left: 10px;
    height: 26px;
    line-height: 26px;
    font-size: 14px;
    margin-bottom: 20px;
    margin-left: -15px;
    background: #f79782;
    border-radius: 5px;
    color: #fff;
    z-index: 10;
  }

  .bf79782:before{
    background: #f79782!important;
  }

  .bf79782 .code{
    background: #f79782!important;
  }

  .bf79782 div:before{
    background: #f79782!important;
  }
  .bf79782 div:after{
    background: #f79782!important;
  }

  .b1b84cd:before{
    background: #1b84cd!important;
  }

  .b1b84cd .code{
    background: #1b84cd!important;
  }

  .b1b84cd div:before{
    background: #1b84cd!important;
  }
  .b1b84cd div:after{
    background: #1b84cd!important;
  }

  .bf7a259:before{
    background: #f7a259!important;
  }

  .bf7a259 .code{
    background: #f7a259!important;
  }

  .bf7a259 div:before{
    background: #f7a259!important;
  }
  .bf7a259 div:after{
    background: #f7a259!important;
  }
</style>
