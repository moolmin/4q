export const requestEmailVerification = async (email: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/email/request`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            throw new Error("이메일 인증 요청에 실패했습니다.");
        }

        return response.json(); // 필요한 경우 반환할 데이터를 수정
    } catch (error) {
        console.error("Error in requestEmailVerification:", error);
        throw error;
    }
};