import SliderCaptcha from 'rc-slider-captcha';
import React, { useRef } from 'react';
import { sleep } from 'ut2';
import createPuzzle from 'create-puzzle';
import { RubyOutlined, MehOutlined, SmileOutlined, RedoOutlined, LoadingOutlined } from '@ant-design/icons'
// 这里是你要自己准备的图片
import pic from '../../assets/SlideImg/2.png'
export default function SoildCaptcha(params){
    const offsetXRef = useRef(0); // x 轴偏移值
    // 查看是否在安全距离
    const verifyCaptcha = async (data) => {
        await sleep();
        if (data.x >= offsetXRef.current - 5 && data.x < offsetXRef.current + 5) {
            setTimeout(() => {
                params.ifSuccess()
                params.onSuccess()
            }, 1000)
            return Promise.resolve();
        }
        return Promise.reject();
    };
    return (
        <div>
            <SliderCaptcha
                request={() =>
                    createPuzzle(pic, {
                        format: 'blob'
                    }).then((res) => {
                        offsetXRef.current = res.x
                        return {
                            // 背景图片
                            bgUrl: res.bgUrl,
                            // 核验区域
                            puzzleUrl: res.puzzleUrl
                        };
                    })
                }
                onVerify={(data) => {
                    console.log(data)
                    return verifyCaptcha(data);
                }}
                // 这里是重点,bgSize必须和原图片的尺寸一样！
                bgSize={{ width: 510, height: 309 }}
                tipIcon={{
                    default: <RubyOutlined />,
                    loading: <LoadingOutlined />,
                    success: <SmileOutlined />,
                    error: <MehOutlined />,
                    refresh: <RedoOutlined />
                }}
                tipText={{
                    default: '向右拖动完成拼图',
                    loading: '努力加载中...',
                    moving: '向右拖动至拼图位置',
                    verifying: '验证中...',
                    error: '验证失败'
                }}
            />
        </div>
    );
}

// export default SoildCaptcha;
