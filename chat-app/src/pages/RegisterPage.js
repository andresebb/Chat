import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { validarForm } from "../helpers/validarForm";
import Swal from "sweetalert2";

export const RegisterPage = () => {
  const { register } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onchange = ({ target }) => {
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const { name, email, password } = form;

    const data = await register(name, email, password);
    if (!data.ok) {
      Swal.fire("Error", `${data.msg}`, "error");
    }
  };

  //Btn Validar
  const todoOk = validarForm(form.email, form.password, form.name);

  return (
    <div>
      <form
        className="login100-form validate-form flex-sb flex-w"
        onSubmit={onSubmit}
      >
        <span className="login100-form-title mb-3">Chat - Registro</span>

        <div className="wrap-input100 validate-input mb-3">
          <input
            className="input100"
            type="text"
            name="name"
            placeholder="Nombre"
            onChange={onchange}
          />
          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100 validate-input mb-3">
          <input
            className="input100"
            type="email"
            name="email"
            placeholder="Email"
            onChange={onchange}
          />
          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100 validate-input mb-3">
          <input
            className="input100"
            type="password"
            name="password"
            placeholder="Password"
            onChange={onchange}
          />
          <span className="focus-input100"></span>
        </div>

        <div className="row mb-3">
          <div className="col text-right">
            <Link to="/auth/login" className="txt1">
              Ya tienes cuenta?
            </Link>
          </div>
        </div>

        <div className="container-login100-form-btn m-t-17">
          <button className="login100-form-btn" disabled={!todoOk}>
            Crear cuenta
          </button>
        </div>
      </form>
    </div>
  );
};
