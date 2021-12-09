import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import { Grid, Image, Transition, Button, Form } from "semantic-ui-react";
import { toast } from "react-toastify";
import _ from "lodash";
import { LOGIN_WORD } from "../../utils/loginPageConstants";

const RegistrationForm = ({
  register: signUp,
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

  const register = async () => {
    try {
      setIsLoading(true);
      await signUp({ email, password });
      setIsLoading(false);
      toggle(LOGIN_WORD);
      toast("🥳 Hooray! You successfully registered!");
    } catch (err) {
      console.log(err);
      toast(
        "🤯 Oops! It looks like your user with such an email or name already exists!"
      );
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
            <div className={style.formRegistration}>
              <p className={style.formTitle}>Registration</p>
              <Form className={style.form} onSubmit={register}>
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
                    errors.name ||
                    errors.email ||
                    errors.password ||
                    _.isEmpty(password) ||
                    _.isEmpty(email)
                  }
                  type="submit"
                  className={style.formButton}
                  color={"blue"}
                  loading={isLoading}
                >
                  Sign up
                </Button>
              </Form>
              <p
                className={style.formSwitcher}
                onClick={() => toggle(LOGIN_WORD)}
              >
                Have an account?
              </p>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Transition>
  );
};

export default RegistrationForm;
