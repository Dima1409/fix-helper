import {useEffect, useState} from "react";
import SearchForm from "components/SearchForm";
import SearchFormStuff from "components/SearchFormStuff";
import {Route, Routes, useNavigate, useLocation} from "react-router-dom";
import {TabsContainer, Tab, TabContent} from "./SteeringPage.styled";
import useAuth from "../../hooks/useAuth";

const SteeringPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {isLoggedIn} = useAuth();

    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index: number, path: string) => {
        setActiveTab(index);
        navigate(path);
    };

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        if (location.pathname === "/steering") {
            navigate("racks");
        }
    }, [location.pathname, navigate]);

    useEffect(() => {
        setActiveTab(location.pathname.includes("stuffing-box") ? 1 : 0);
    }, [location.pathname]);


    return (
        <div>
            <TabsContainer>
                <Tab isactive={activeTab === 0} onClick={() => handleTabClick(0, "racks")}>
                    Рейки
                </Tab>
                <Tab isactive={activeTab === 1} onClick={() => handleTabClick(1, "stuffing-box")}>
                    Сальники
                </Tab>
            </TabsContainer>

            <TabContent>
                <Routes>
                    <Route path="racks" element={<SearchForm/>}/>
                    <Route path="racks/:id" element={<SearchForm/>}/>
                    <Route path="stuffing-box" element={<SearchFormStuff/>}/>
                    <Route path="stuffing-box/:id" element={<SearchFormStuff/>}/>
                </Routes>
            </TabContent>
        </div>
    );
};

export default SteeringPage;
