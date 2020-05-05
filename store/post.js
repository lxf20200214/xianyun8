// 存放仓库该分类(user)下的数据,export const state=()是固定的格式
// export const state = {
//   // 登录成功后接口返回的用户数据,里面包含了token和用户的详细信息
//   username: "小米"
// };

export const state = () => {
  return {
    saveData: []
  };
};

// 同步修改state的数据
export const mutations = {
  // 存储草稿箱
  setSaveData(state, data) {
    if (state.saveData.length) {
      // 先假设所有的验证都是通过的
      let isvalid = true;
      state.saveData.forEach(v => {
        // 只要一个判断没通过,阻止后面的判断
        if (!isvalid) return;
        // 发现有不通过的判读
        if (
          v.title === data.title &&
          v.content === data.content &&
          v.city === data.city
        ) {
          isvalid = false;
        }
      });
      // 如果验证不通过,就直接返回
      if (!isvalid) return;
    }
    // 把新的保存草稿的数据追加到第一个
    state.saveData.unshift(data);
    // 如果历史记录的长度大于5
    if (state.saveData.length > 5) {
      // 只保留数组的前五位
      state.saveData.length = 5;
    }
  }
};
