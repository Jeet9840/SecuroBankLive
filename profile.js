upload.addEventListener("change",e=>{
  const file=e.target.files[0];
  const reader=new FileReader();
  reader.onload=()=>{
    profileImg.src=reader.result;
    localStorage.setItem("securoPic",reader.result);
  }
  reader.readAsDataURL(file);
});

window.onload=()=>{
  const img=localStorage.getItem("securoPic");
  if(img) profileImg.src=img;
}
