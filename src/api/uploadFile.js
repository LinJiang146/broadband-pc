function uploadFile(id,path,callback) {
  var fileWidget = document.getElementById(id);
  let param = new FormData();

  for (var i = 0; i < fileWidget.files.length; i++) {
    let file = fileWidget.files[i];

    if (!file) {
      return false
    }
    if (file.size > 10000000) {
      // mui.alert('不能超过10MB');
    } else {
      //通过append向form对象添加数据
      param.append("file", file);


      let config = {
        //添加请求头
        headers: {
          "Content-Type": "multipart/form-data"
        },
      };


      axios.post('http://localhost:8081/'+path, param, config).then(
        response => {
          callback(response)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
}
export default uploadFile
