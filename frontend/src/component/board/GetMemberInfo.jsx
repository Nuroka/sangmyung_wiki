import axios from 'axios';
import {authInstance} from "../../util/api";

const getMemberInfo = async () => {
    try {
        const response = await authInstance.get('/mypage', {

        });
        console.log(response.data);
        return response.data; // 마이페이지 정보 반환
    } catch (error) {
        console.error('Error fetching my page info:', error);
        throw error;
    }
};

export default getMemberInfo;
