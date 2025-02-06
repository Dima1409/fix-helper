import {useEffect, useState} from "react";
import SearchForm from "components/SearchForm";
import SearchFormStuff from "components/SearchFormStuff";
import {Route, Routes, useNavigate, useLocation} from "react-router-dom";
import {TabsContainer, Tab, TabContent} from "./SteeringPage.styled";
import useAuth from "../../hooks/useAuth";
import SearchFormByVehicles from "components/SearchFormByVehicles";

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
            navigate("racks-by-number");
        }
    }, [location.pathname, navigate]);

    useEffect(() => {
        if (location.pathname.includes("stuffing-box")) {
            setActiveTab(2);
        } else if (location.pathname.includes("racks-by-vehicles")) {
            setActiveTab(1);
        } else {
            setActiveTab(0);
        }
    }, [location.pathname]);


    return (
        <div>
            <TabsContainer>
                <Tab isactive={activeTab === 0} onClick={() => handleTabClick(0, "racks-by-number")}>
                    Підбір по номеру
                </Tab>
                <Tab isactive={activeTab === 1} onClick={() => handleTabClick(1, "racks-by-vehicles")}>
                    Підбір по авто
                </Tab>
                <Tab isactive={activeTab === 2} onClick={() => handleTabClick(2, "stuffing-box")}>
                    Сальники
                </Tab>
            </TabsContainer>

            <TabContent>
                <Routes>
                    <Route path="racks-by-number" element={<SearchForm/>}/>
                    <Route path="racks-by-number/:id" element={<SearchForm/>}/>
                    <Route path="racks-by-vehicles" element={<SearchFormByVehicles/>}/>
                    <Route path="racks-by-vehicles/:id" element={<SearchFormByVehicles/>}/>
                    <Route path="stuffing-box" element={<SearchFormStuff/>}/>
                    <Route path="stuffing-box/:id" element={<SearchFormStuff/>}/>
                </Routes>
            </TabContent>
        </div>
    );
};

export default SteeringPage;
