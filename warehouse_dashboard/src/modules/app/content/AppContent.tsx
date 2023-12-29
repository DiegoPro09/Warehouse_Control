import { Col, Layout, Row, Typography } from "antd"
import { Content } from "antd/es/layout/layout"
import { ContentActions, CustomHeader } from "./styles/ContentStyles"
import { AppSidebar } from "../sidebar/AppSidebar"

const { Title } = Typography

interface AppContentProps {
    title?: string,
    primaryActions: React.ReactNode[],
    children: React.ReactNode
}

export const AppContent:React.FC<AppContentProps> = ({ title, primaryActions, children }) =>{
    return (
        <>
            <AppSidebar />
            <Layout>
                <CustomHeader>
                    <Title level={4}>{title}</Title>
                    <ContentActions>
                        <Row gutter={16}>
                            {primaryActions.map((component) => (
                                <Col className="gutter-row" span={8}>
                                    {component}
                                </Col>
                            ))}
                        </Row>
                    </ContentActions>
                </CustomHeader>

                <Content style={{ margin: '30px', background: 'white' }}>
                    {children}
                </Content>
            </Layout>
        </>
    )
}