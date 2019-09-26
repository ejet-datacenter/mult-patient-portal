import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({

  state: {
    
    codeEmpi: "",
    codeVisitType: "",
    codePatientId: "",
    codeInpatientId: "",
    codeInHospitalId: ""
  },
  getters: {
    /** 新增加 */
    getCodeEmpi: function (state) {
      return state.codeEmpi
    },
    getCodeVisitType : function (state) {
      return state.codeVisitType
    },
    getCodePatientId: function (state) {
      return state.codePatientId
    },
    getCodeInpatientId: function (state) {
      return state.codeInpatientId
    },
    getCodeInHospitalId: function (state) {
      return state.codeInHospitalId
    }
  },
  mutations: {
        /** 新增加 */
    setCodeEmpi : function (state, code) {
      state.codeEmpi = code
    },
    setCodeVisitType: function (state, code) {
      state.codeVisitType = code
    },
    setCodePatientId : function (state, code) {
      state.codePatientId = code
    },
    setCodeInpatientId: function (state, code) {
      state.codeInpatientId = code
    },
    setCodeInHospitalId : function (state, code) {
      state.codeInHospitalId = code
    },
  }
});

export default store
