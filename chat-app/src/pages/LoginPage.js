import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

export const LoginPage = () => {
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "test1@gmail.com",
    password: "123456",
    rememberme: false,
  });

  //Recordar User
  useEffect(() => {
    const remembermeEmail = localStorage.getItem("email");

    if (remembermeEmail) {
      //Lo hacemos asi para que react no nos diga que a le hace falta una dependencia al useEffect
      setForm((form) => ({
        ...form,
        email: remembermeEmail,
        rememberme: true,
      }));
    }
  }, []);

  const onChange = ({ target }) => {
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();

    form.rememberme
      ? localStorage.setItem("email", form.email)
      : localStorage.removeItem("email");

    //Enviar al backend
    const { email, password } = form;
    const ok = await login(email, password);
    if (!ok) {
      Swal.fire("Error", "Verifique el usuario y contrasena", "error");
    }
  };

  const toggleCheck = () => {
    setForm({
      ...form,
      rememberme: !form.rememberme,
    });
  };

  const todoOk = () => {
    return form.email.length > 0 && form.password.length > 0 ? true : false;
  };

  return (
    <div>
      <form
        className="login100-form validate-form flex-sb flex-w"
        onSubmit={onSubmit}
      >
        <span className="login100-form-title mb-3">Chat - Ingreso</span>

        <div className="wrap-input100 validate-input mb-3">
          <input
            className="input100"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
          />
          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100 validate-input mb-3">
          <input
            className="input100"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
          />
          <span className="focus-input100"></span>
        </div>

        <div className="row mb-3" onClick={() => toggleCheck()}>
          <div className="col">
            <input
              className="input-checkbox100"
              id="ckb1"
              type="checkbox"
              name="rememberme"
              checked={form.rememberme}
              readOnly
            />
            <label className="label-checkbox100">Recordarme</label>
          </div>

          <div className="col text-right">
            <Link to="/auth/register" className="txt1">
              Nueva cuenta?
            </Link>
          </div>
        </div>

        <div className="container-login100-form-btn m-t-17">
          <button
            className="login100-form-btn"
            type="submit"
            disabled={!todoOk()}
          >
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
};
