window.onload = async () => {
  // Session Storage에 저장된 사용자 정보 가져와서 로그인 유지하기
  const email = sessionStorage.getItem("email");
  if (email) {
    document.getElementById("loginSpan").innerHTML =
      email + ` <button id="logout">logout</button>`;
  }

  axios.defaults.withCredentials = true; // Axios가 요청을 보낼 때, 쿠키 및 인증 정보를 포함하도록 설정하는 옵션
  let productList = await fetch("http://localhost:8080/getAllProducts", {
    method: "GET",
  });
  productList = await productList.json();
  console.log(productList);
  if (productList) {
    let productListDiv = ``;
    productList.forEach((item) => {
      productListDiv += `<div class="card mt-2" style="width: 10rem;">
                          <img src="img/${item.pimg}" class="card-img-top" alt="${item.prodname}" height="150">
                          <div class="card-body">
                            <b class="card-title">${item.prodname}</b><br>
                            <span class="card-text text-danger">${item.price}원</span>
                            <a href="#" class="btn btn-outline-info" id="addCart">장바구니 담기</a>
                          </div>
                        </div>`;
    });
    document.getElementById("productListDiv").innerHTML = productListDiv;
  }
};

// 로그인
document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value;
  const pwd = document.getElementById("loginPwd").value;
  const data = { email, pwd };

  let response = await axios.post("http://localhost:8080/login", data);
  console.log(response);
  alert(response.data.msg);

  if (response.data.msg === "ok") {
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("loginModal")
    );
    modal.hide();
    document.getElementById("loginSpan").innerHTML =
      email + ` <button id="logout">logout</button>`;

    // Session Storage 사용해서 로그인한 사용자 정보 저장
    window.sessionStorage.setItem("email", email);
  }
});

// 로그아웃
document.getElementById("loginSpan").addEventListener("click", (event) => {
  if (event.target.id === "logout") {
    sessionStorage.removeItem("email"); // Session Storage에 저장된 사용자 정보 삭제
    window.location.reload(); // 화면 갱신
  }
});

// 장바구니 담기
// JS에서 동적으로 추가한 HTML 요소는 이벤트 리스너를 가질 수 없음
document.getElementById("productListDiv").addEventListener("click", (event) => {
  if (event.target.id === "addCart") {
    const response = axios.post("http://localhost:8080/addCart", {});
  }
});
