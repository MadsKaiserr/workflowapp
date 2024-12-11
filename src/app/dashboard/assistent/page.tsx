import { getTips, getUser } from "../../lib"
import Tips from "./components/tips"
import Sidebar from '../../components/sidebar';

export default async function Assistent() {
  const userData: any = {...await getUser()}
  const tipData: any = [...await getTips(userData.clientUserData)]

  return (
    <>
      <div className="dashboard__container">
        <Sidebar />
        <div className="dashboard__content">
          <div className="dashboard__content__header">
            <div className="dashboard__content__header__indhold">
              <p className="dashboard__content__heading">Workflow Assistent</p>
              <p className="dashboard__content__p">Få hjælp til at maksimere din effektivitet på Workflow</p>
            </div>
          </div>
          <Tips user={userData} tips={tipData} />
        </div>
      </div>
    </>
  );
}
