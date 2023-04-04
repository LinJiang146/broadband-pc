function downloadImg(name,path,callback) {
    axios({
        method: 'GET',
        url: 'http://localhost:8081/' + path,
        // 设置 header 参数
        // headers: {
        //   'Access-Control-Expose-Headers': 'Content-Disposition'
        // },
        responseType: 'blob', // 一定要设置响应类型，否则不能正确处理响应的数据
        params: {
            name: name
        }
    }).then(function(res) {

        let blob = new Blob([res.data], {
            type: 'image/png'
        })
        var a = new FileReader();
        a.readAsDataURL(blob);
        a.onload = function(e) {

            callback(e.target.result);
        };
    })
}
export default downloadImg