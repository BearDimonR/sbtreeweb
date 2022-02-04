import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import { Grid, Image, Button, Form, Transition } from "semantic-ui-react";
import { toast } from "react-toastify";
import _ from "lodash";
import { REGISTRATION_WORD } from "../../utils/loginPageConstants";

const LoginForm = ({
  login: signIn,
  toggle,
  setIsLoading,
  isLoading,
  isVisible,
}) => {
  const [errors, setErrors] = useState({
    password: false,
    email: false,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const login = async () => {
    try {
      setIsLoading(true);
      await signIn({ email, password });
      setIsLoading(false);
    } catch (err) {
      toast("🤯 Oops! It looks like your login or password is wrong!");
      setIsLoading(false);
    }
  };

  const handleEmailChange = (email) => {
    setEmail(email);
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
    validatePassword(password);
  };

  const validateEmail = (email) => {
    if (
      email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setErrors({ ...errors, email: false });
    } else {
      setErrors({ ...errors, email: true });
    }
  };

  const validatePassword = (password) => {
    if (_.size(password) < 8 || _.size(password) > 16) {
      setErrors({ ...errors, password: true });
    } else {
      setErrors({ ...errors, password: false });
    }
  };

  return (
    <Transition visible={isVisible} animation="browse right" duration={800}>
      <Grid className={style.formContainer}>
        <Grid.Row columns={2} className={style.formGrid}>
          <Grid.Column className={style.formGrid}>
            <Image className={style.image} src="/login.png" />
          </Grid.Column>
          <Grid.Column className={style.formGrid}>
            <div className={style.formLogin}>
              <p className={style.formTitle}>Login</p>
              <Form
                error={errors.name || errors.email || errors.password}
                className={style.form}
                onSubmit={login}
              >
                <Form.Input
                  className={style.formField}
                  fluid
                  icon="at"
                  error={errors.email}
                  iconPosition="left"
                  placeholder="email"
                  type="email"
                  value={email}
                  onChange={(ev) => handleEmailChange(ev.target.value)}
                  onBlur={(ev) => validateEmail(ev.target.value)}
                />
                {errors.email && (
                  <p className={style.formError}>Please enter valid email</p>
                )}
                <Form.Input
                  fluid
                  icon="lock"
                  error={errors.password}
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  className={style.formField}
                  value={password}
                  onChange={(ev) => handlePasswordChange(ev.target.value)}
                  onBlur={(ev) => validatePassword(ev.target.value)}
                />
                {errors.password && (
                  <p className={style.formError}>
                    Password length must be from 8 to 16
                  </p>
                )}
                <Button
                  disabled={
                    errors.email ||
                    errors.password ||
                    _.isEmpty(password) ||
                    _.isEmpty(email)
                  }
                  className={style.formButton}
                  color={"blue"}
                  loading={isLoading}
                >
                  Sign in{" "}
                </Button>
              </Form>
              <p
                className={style.formSwitcher}
                onClick={() => toggle(REGISTRATION_WORD)}
              >
                New user?
              </p>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Transition>
  );
};

export default LoginForm;
