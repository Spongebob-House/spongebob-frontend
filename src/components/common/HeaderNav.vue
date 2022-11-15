<template>
  <header>
    <div class="nav d-flex justify-content-between align-items-center mt-2 mb-2">
      <div class="logo justify-content-start ms-5">
        <a class="text-decoration-none ddisplay-5 font-weight-bold" href="#">FIND HOME</a>
      </div>
      <div class="nav justify-content-end logined">
        <div class="logined-info me-3 align-middle"><strong>김싸피</strong> 님 안녕하세요.</div>
        <button class="hospital-btn btn me-3" id="btn-hospital">Hospital</button>
        <button class="corona-btn btn me-3" id="btn-corona">Corona</button>
        <button class="mvsearch-btn btn me-3" id="btn-homesearch">HomeSearch</button>
        <button class="notice-btn btn me-3" id="btn-notice">Notice</button>
        <button class="mypage-btn btn me-3" id="btn-mypage">MyPage</button>
        <button class="logout-btn btn me-3" id="btn-logout">Logout</button>
      </div>
      <div class="nav justify-content-end">
        <button id="btn-mv-join" class="join-btn btn me-3">Join</button>

        <div class="login-area me-3">
          <div class="dropdown login-pop">
            <button
              class="btn dropdown-toggle"
              type="button"
              id="dropdownMenu"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              Login
            </button>
            <form method="POST" class="dropdown-menu p-3" id="form-login" aria-labelledby="dropdownMenu">
              <div class="form-check mb-3 float-end">
                <input class="form-check-input" type="checkbox" value="ok" id="saveid" name="saveid" />
                <label class="form-check-label" for="saveid"> 아이디저장 </label>
              </div>
              <div class="mb-3">
                <label for="userid" class="form-label">ID</label>
                <input type="text" class="form-control" id="userid" name="userid" placeholder="ID..." />
              </div>
              <div class="mb-3">
                <label for="userpwd" class="form-label">PW</label>
                <input type="password" class="form-control" id="userpwd" name="userpwd" placeholder="PW..." />
              </div>
              <div class="alert alert-danger mb-2"><small>${msg }</small></div>
              <div class="col-auto text-center">
                <button type="button" id="btn-login" class="btn btn-outline-primary mb-3">Login</button>
                <button type="button" id="btn-findpw" class="btn btn-primary mb-3">비밀번호 찾기</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderNav",
  data() {
    return {};
  },
};
</script>

<style></style>
