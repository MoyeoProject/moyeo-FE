import { DeveloperBox, SubPageBox } from '../styles/ProfileSubPageStyle';
import { SubNav } from './AlarmListPage';

const InfoDeveloperPage = () => {
  return (
    <SubPageBox>
      <SubNav children={'만든이들'} />
      <DeveloperBox>
        <p>열심히 제작했어요</p>
        <div className="developer">
          <div className="devPerson">
            <div>
              <p>장영주</p>
              <p>BackEnd</p>
            </div>
            <button onClick={() => window.open('https://github.com/Youngju-Jang')}>
              깃허브 가기
            </button>
          </div>
          <div className="devPerson">
            <div>
              <p>김지민</p>
              <p>BackEnd</p>
            </div>
            <button onClick={() => window.open('https://github.com/rgngr')}>깃허브 가기</button>
          </div>
          <div className="devPerson">
            <div>
              <p>윤덕현</p>
              <p>BackEnd</p>
            </div>
            <button onClick={() => window.open('https://github.com/yundukhyun')}>
              깃허브 가기
            </button>
          </div>
          <div className="devPerson">
            <div>
              <p>박선영</p>
              <p>FrontEnd</p>
            </div>
            <button onClick={() => window.open('https://github.com/Superduper-India')}>
              깃허브 가기
            </button>
          </div>
          <div className="devPerson">
            <div>
              <p>정소영</p>
              <p>FrontEnd</p>
            </div>
            <button onClick={() => window.open('https://github.com/thdud2262')}>깃허브 가기</button>
          </div>
          <div className="devPerson">
            <div>
              <p>김진아</p>
              <p>UXUI Design</p>
            </div>
            <button onClick={() => window.open('https://www.behance.net/valuedefault')}>
              비헨스 가기
            </button>
          </div>
        </div>
      </DeveloperBox>
    </SubPageBox>
  );
};
export default InfoDeveloperPage;
