import {useEffect, useState} from "react";
import SearchForm from "components/SearchForm";
import SearchFormStuff from "components/SearchFormStuff";
import {Route, Routes, useNavigate, useLocation} from "react-router-dom";
import {TabsContainer, Tab, TabContent} from "./SteeringPage.styled";

const SteeringPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getInitialTab = (pathname: string) => {
        if (pathname.includes("stuffing-box")) {
            return 1;
        }
        return 0;
    };

    const [activeTab, setActiveTab] = useState(getInitialTab(location.pathname));

    const handleTabClick = (index: number, path: string) => {
        setActiveTab(index);
        navigate(path);
    };

    useEffect(() => {
        if (location.pathname === "/steering") {
            navigate("racks");
        }
    }, [location.pathname, navigate]);


    return (
        <div>
            <TabsContainer>
                <Tab isActive={activeTab === 0} onClick={() => handleTabClick(0, "racks")}>
                    Рейки
                </Tab>
                <Tab isActive={activeTab === 1} onClick={() => handleTabClick(1, "stuffing-box")}>
                    Сальники
                </Tab>
            </TabsContainer>

            <TabContent>
                <Routes>
                    <Route path="racks" element={<SearchForm/>}/>
                    <Route path="stuffing-box" element={<SearchFormStuff/>}/>
                </Routes>
            </TabContent>
        </div>
    );
};

export default SteeringPage;
