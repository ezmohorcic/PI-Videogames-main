import React from "react";
import { Link } from "react-router-dom";
import { configure, shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import store from '../../redux/store';
import { Header } from "./Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("<Header />", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(
        <Provider store={store}>
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        </Provider>);
    });

    it("Deberia renderizar Tres <Link />", () => {
        expect(wrapper.find("Link")).toHaveLength(3);
    });
});