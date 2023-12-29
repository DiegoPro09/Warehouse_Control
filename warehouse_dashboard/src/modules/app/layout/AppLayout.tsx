import { Layout } from "antd";

export const AppLayout:React.FC<{ children:React.ReactNode }> = ({ children }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            {children}
        </Layout>
    )
}