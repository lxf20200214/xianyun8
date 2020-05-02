export const state = () => {
  return {
    setcitydata: {
      scenics: {}
    },
    hotellist: [],
    map: {}
  };
};

// 同步修改state的数据
export const mutations = {
  // 存储历史查询的数据
  setcitydata(state, data) {
    state.setcitydata = data;
  },
  setHotellist(state, data) {
    state.hotellist = data;
  }
};
