'use client'

import Link from "next/link";
import {Provider} from "react-redux";
import store from "@/store/store";

export default function Home() {
    return (
        <Provider store={store}>
            <div>App dashboard</div>
            <Link href={"/manage/product"}>Go to manage page</Link>
        </Provider>
    );
}
