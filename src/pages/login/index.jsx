import LoginCard from '../../components/LoginCard'
import BottomText from '../../components/BottomText'
import './index.css';

export default function Index() {
    return (
        <div className="background">
            <LoginCard/>
            <BottomText item="© MyCloudDisk官方登录网站"/>
        </div>
    );
}