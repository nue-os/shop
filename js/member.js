// 회원가입;
document.getElementById("signupBtn").addEventListener("click", async () => {
  const nickname = document.getElementById("nickname").value;
  const email = document.getElementById("email").value;
  const pwd = document.getElementById("pwd").value;
  const data = { nickname, email, pwd };
  let response = await axios.post("http://localhost:8080/insertMember", data);
  console.log(response);
  if (response.data.msg === "ok") {
    console.log("ok");
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("signupModal")
    );
    modal.hide();

    document.getElementById("signupLi").remove();
  } else {
    alert(response.data.msg);
  }
});
