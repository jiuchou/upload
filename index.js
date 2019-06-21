var uploadImages = []
var uploadNum = 0
function selectImage(imgFiles) {
  let allFile = imgFiles.files;
  let allSize = 0;
  let rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;
  console.log(allFile)
  let imageArr = [];
  let li = '';
  for(let i=0;i<allFile.length;i++){
    let file = allFile[i];
    //添加一层过滤

    if(!rFilter.test(file.type)) {
      alert("文件格式必须为图片");
      return;
    }
    let fileSize = file.size / 1024;
    if (fileSize > 50) {
      alert("单张照片大小不得超过50M！");
      return;
    }
    allSize += fileSize;
    let image = {
      "name": file.name,
      "size": file.size
    }
    uploadImages.push(image);
    li += '<li>' + file.name + ' </li>'
    let reader = new FileReader();
    reader.readAsDataURL(file); //用文件加载器加载文件
    uploadFiles(uploadImages)
    //文件加载完成
    // reader.onload = function(e) {

    // };
  }
  document.getElementById('uploadUl').innerHTML = li
}
function uploadFiles(images) {
  console.log(images.length)
  for(let i = 0; i<images.length; i++) {
    let image = images[i]
    let imgUlHtml = document.getElementById("imgUl").innerHTML;
    let li = imgUlHtml + '<li>' + image.name + ' </li>';
    document.getElementById("imgUl").innerHTML = li
    sendImagesToServer(image, uploadSeccess)
  }
}

function uploadSeccess (result) {
  console.log(result);
  console.log("上传成功");

  uploadNum++
  document.getElementById("uploadNum").innerHTML = uploadNum;

  if(uploadImages.length == 1) {
    uploadImages = []
  }else {
    uploadImages = uploadImages.slice(0, 1);
  }
  uploadFiles(uploadImages);
}

