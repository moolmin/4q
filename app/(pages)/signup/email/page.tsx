"use client";

import { useState, useEffect } from "react";
import { Form, Input, Button, AutoComplete, message } from "antd";
import type { AutoCompleteProps } from "antd";
import styles from "./page.module.css";
import { requestEmailVerification, verifyEmailCode } from "../../../../service/auth_api";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [timerCount, setTimerCount] = useState(180);
    const [buttonText, setButtonText] = useState("이메일 인증");
    const [verificationCode, setVerificationCode] = useState("");
    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

    const handleSearch = (value: string) => {
        setOptions(() => {
            if (!value || value.includes('@')) {
                return [];
            }
            return ['gmail.com', 'naver.com', 'daum.net', 'nate.com', 'outlook.com'].map((domain) => ({
                label: `${value}@${domain}`,
                value: `${value}@${domain}`,
            }));
        });
    };

    const handleEmailChange = (value: string) => {
        setEmail(value);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailPattern.test(value));
    };

    const handleEmailVerification = async () => {
        if (isEmailValid) {
            try {
                await requestEmailVerification(email);
                message.success("이메일 인증 요청이 전송되었습니다.");
                setButtonText("이메일 재전송");
                setIsTimerActive(true);
                setTimerCount(180); // 타이머를 3분으로 초기화
            } catch (error) {
                message.error(error.message || "이메일 인증 요청에 실패했습니다.");
            }
        } else {
            message.error("유효한 이메일을 입력해주세요.");
        }
    };

    const handleCodeVerification = async () => {
        if (verificationCode.length === 6) {
            try {
                const result = await verifyEmailCode(email, verificationCode);
                message.success("이메일 인증이 완료되었습니다.");
                setIsTimerActive(false); // 타이머 중지
            } catch (error) {
                message.error(error.message || "이메일 인증에 실패했습니다.");
            }
        } else {
            message.error("6자리 인증번호를 입력해주세요.");
        }
    };


    useEffect(() => {
        if (isTimerActive && timerCount > 0) {
            const timerId = setInterval(() => {
                setTimerCount((prevCount) => prevCount - 1);
            }, 1000);

            return () => clearInterval(timerId);
        } else if (timerCount === 0) {
            setIsTimerActive(false);
        }
    }, [isTimerActive, timerCount]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    const onFinish = (values: any) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className={styles.container}>
            <Form
                name="signup"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 700, width: "80%" }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item
                    label="이메일"
                    name="email"
                    rules={[{ required: true, message: "이메일을 입력해주세요." }]}
                    className={styles.emailcontainer}
                >
                    <AutoComplete
                        options={options}
                        onSearch={handleSearch}
                        onChange={handleEmailChange}
                        value={email}
                        style={{ width: '100%', height: '50px' }}
                    >
                        <Input
                            placeholder="example@example.com"
                            className={styles.inputField}
                        />
                    </AutoComplete>
                    <button
                        className={styles.emailBtn}
                        style={{
                            backgroundColor: isEmailValid ? "var(--primary-color)" : "",
                            color: isEmailValid ? "white" : "",
                        }}
                        onClick={handleEmailVerification}
                        type="button"
                    >
                        {buttonText}
                    </button>
                </Form.Item>


                <Form.Item
                    name="emailVerification"
                    rules={[{ required: true, message: "이메일 인증 번호를 입력해주세요." }]}
                    className={styles.emailValiContainer}
                >
                    {/* <div className={styles.valiTitle}><span className={styles.red}>*</span> 이메일 인증번호</div> */}
                    <div className={styles.valiContainer}>
                        {isTimerActive && (
                            <span className={styles.timerContainer}>
                                {formatTime(timerCount)}
                            </span>
                        )}
                        <Input
                            // type="number"
                            placeholder="인증번호 6자리를 입력해주세요."
                            maxLength={6}
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            className={styles.inputField}
                        />
                        <button
                            className={styles.emailValiBtn}
                            style={{
                                backgroundColor: verificationCode.length === 6 ? "var(--primary-color)" : "#e3e3e3",
                                color: verificationCode.length === 6 ? "white" : "",
                            }}
                            onClick={handleCodeVerification}
                            type="button"
                        >
                            확인
                        </button>
                    </div>
                </Form.Item>

                <Form.Item
                    label="비밀번호"
                    name="password"
                    rules={[{ required: true, message: "비밀번호를 입력해주세요." }]}
                >
                    <Input.Password
                        placeholder="영문/숫자/특수문자 혼합 8~20자"
                        className={styles.inputField}
                    />
                </Form.Item>

                <Form.Item
                    label="비밀번호 확인"
                    name="passwordConfirm"
                    rules={[{ required: true, message: "비밀번호를 한 번 더 입력해주세요." }]}
                >
                    <Input.Password
                        placeholder="비밀번호를 한 번 더 입력해주세요"
                        className={styles.inputField}
                    />
                </Form.Item>

                <Form.Item
                    label="닉네임"
                    name="nickname"
                    rules={[{ required: true, message: "닉네임을 입력해주세요." }]}
                >
                    <Input
                        placeholder="2~16자 이내로 입력해주세요"
                        className={styles.inputField}
                    />
                </Form.Item>

                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ height: "50px" }}
                    className={styles.submitBtn}
                >
                    동의하고 가입하기
                </Button>

                <Form.Item wrapperCol={{ span: 18 }}>
                    <div className={styles.btnContainer}></div>
                </Form.Item>
            </Form>
        </div>
    );
}
