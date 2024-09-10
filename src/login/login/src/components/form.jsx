import "./form.css";

function Form() {
  return (
    <div>
      <section class="vh-100">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-6 text-black">
              <div class="px-5 ms-xl-4 ">
                <i class="fas fa-crow fa-2x me-3 pt-5 mt-xl-4 "></i>
              </div>

              <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5 bd ">
                <form>
                  <center>
                    <h3 class=" mb-2 pb-2 log">Login</h3>
                  </center>
                  <div data-mdb-input-init class="form-outline mb-2 ">
                    <label class="form-label  " for="form2Example18">
                      Role :
                    </label>
                    <input
                      type="email"
                      id="form2Example18"
                      class="form-control form-control-lg inp "
                    />
                  </div>

                  <div data-mdb-input-init class="form-outline mb-2 ">
                    <label class="form-label  " for="form2Example18">
                      Username :
                    </label>
                    <input
                      type="email"
                      id="form2Example18"
                      class="form-control form-control-lg inp "
                    />
                  </div>

                  <div data-mdb-input-init class="form-outline mb-2">
                    <label class="form-label" for="form2Example28">
                      Password :
                    </label>
                    <input
                      type="password"
                      id="form2Example28"
                      class="form-control form-control-lg inp"
                    />
                  </div>

                  <div class="pt-1 mb-2">
                    <button
                      data-mdb-button-init
                      data-mdb-ripple-init
                      class="btn btn-primary btn-lg inp"
                      type="button"
                    >
                      Login
                    </button>
                  </div>
                  <input type="checkbox" name="Remember me" id="" />
                  <p class="">
                    <a class="text-muted" href="#!">
                      Forgot password?
                    </a>
                  </p>
                  <p>
                    Don't have an account?{" "}
                    <a href="#!" class="link-info">
                      Register here
                    </a>
                  </p>
                </form>
              </div>
            </div>
            <div class="col-sm-6 px-0 d-none d-sm-block">
              <img src="lk.jpg" alt="Login image" class="w-100 vh-100 " />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Form;
