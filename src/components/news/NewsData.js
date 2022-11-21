const newsData = [
  {
    cnt: 1,
    description:
      '이와함께 송도세브란스병원을 포함한 연세대 국제캠퍼스 조성을 위해 설립된 특수목적법인 송도국제화복합단지개발(주)(이하 송도복합개발)도 내년부터 공동<b>주택</b> 분양을 시작으로 연세대 국제캠퍼스 수익용지 개발... ',
    link: 'http://www.kyeongin.com/main/view.php?key=20221117010003183',
    org_link: 'http://www.kyeongin.com/main/view.php?key=20221117010003183',
    pDate: '2022-11-17 21:48:00',
    title: '송도세브란스 내달 28일 첫삽… 2026년 하반기 준공 목표 진행',
    src: 'http://imgnews.naver.net/image/009/2017/11/01/0004040120_001_20171101092815442.jpg',
  },
  {
    cnt: 2,
    description:
      '은행 <b>주택</b>담보 및 전세자금 대출 금리의 지표가 되는 코픽스(자금조달비용지수·COFIX)가 빠르게 오르면서 연 5%대 금리의 <b>주택</b> 관련 대출 상품이 사라지고 있다. 한국은행이 조만간 기준금리를 인상하면 대출... ',
    link: 'https://www.khan.co.kr/economy/finance/article/202211172145005',
    org_link: 'https://www.khan.co.kr/economy/finance/article/202211172145005',
    pDate: '2022-11-17 21:46:00',
    title: '주담대 연 5%대는 ‘그림의 떡’ 되나',
    src: 'http://imgnews.naver.net/image/421/2018/09/04/0003572149_001_20180904155727695.jpg',
  },
  {
    cnt: 3,
    description:
      '특히 태화산 아래 위치한 12, 15, 18, 19통 지역(이하 꽃뜰마을) <b>주택</b>들은 열악한 생활기반 시설로 달동네로 전락했다는 오명을 얻기도 했다. 안동시는 용상동에 대해 &apos;새로운 용오름을 위한 원기회복&apos;을 모토로 한 뉴딜사업... ',
    link: 'https://www.idaegu.co.kr/news/articleView.html?idxno=401499',
    org_link: 'https://www.idaegu.co.kr/news/articleView.html?idxno=401499',
    pDate: '2022-11-17 21:44:00',
    src: 'http://imgnews.naver.net/image/5119/2017/06/16/0000598385_001_20170616060324716.png',
    title: '쇠락한 동·서부 부도심, 주민 힘모아 부활 &apos;날갯짓&apos;',
  },
  {
    cnt: 4,
    description:
      '경기도 성남시가 경기도 최초로 LH와 함께 청년 발달장애인들의 자립을 위해 <b>주택</b> 지원에 나서기로 했습니다.... 성남시는 오늘 한국토지<b>주택</b>공사, LH와 협약을 맺고 내년부터 청년 발달장애인들에게 시세의 40% 수준으로... ',
    link: 'https://news.kbs.co.kr/news/view.do?ncd=5604173&amp;ref=A',
    org_link: 'https://news.kbs.co.kr/news/view.do?ncd=5604173&amp;ref=A',
    pDate: '2022-11-17 21:40:00',
    src: 'https://i.pinimg.com/736x/20/2e/c3/202ec3cddf103328040a279f85d56cf4--osaka-japan-skylines.jpg',
    title: '“청년 발달장애인 자립 돕자”…성남시, 내년부터 대폭 지원',
  },
  {
    cnt: 5,
    description:
      '국립산림과학원 ‘빅데이터로 보는 산림’을 보면 같은 크기의 <b>주택</b> 1개 동을 짓기 위해선 철골 프리패브와 철근콘크리트의 경우 각각 54.06t, 79.98t가량의 이산화탄소를 방출한다. 반면 목조<b>주택</b>의 방출 이산화탄소량은... ',
    link: 'https://www.khan.co.kr/local/Seoul/article/202211172135025',
    org_link: 'https://www.khan.co.kr/local/Seoul/article/202211172135025',
    pDate: '2022-11-17 21:37:00',
    title: '목재가 약하다고? 성능·환경 다 잡은 ‘고성능 건축 자재’',
    src: 'https://cdn.eyeem.com/thumb/49da8dcfd3fe17971f853811e467a1facc2c96d0-1397557629/3900/3900',
  },
  {
    cnt: 6,
    description:
      '정부는 내년도 1월 1일자 <b>주택</b> 공시가격과 토지 공시지가 산정에 착수했다. 정부 계획대로 현실화율이 올해 수준으로 동결되면 실거래가 하락으로 내년 <b>주택</b> 공시가격도 올해보다 떨어지는 곳이 많을 것으로 보인다.... ',
    link: 'https://www.idaegu.co.kr/news/articleView.html?idxno=401476',
    org_link: 'https://www.idaegu.co.kr/news/articleView.html?idxno=401476',
    pDate: '2022-11-17 21:34:00',
    title: '전국 아파트 실거래가격 지수 낙폭 &apos;역대 최대&apos;',
    src: 'https://modo-phinf.pstatic.net/20210111_106/1610305536262siUOt_PNG/mosaQUiheY.png',
  },
  {
    cnt: 7,
    description:
      '금리 인상이 계속되면서 전국의 <b>주택</b> 매매심리가 3개월 연속 하강 국면을 이어갔다. 국토연구원 부동산시장연구센터가 17일 발표한 지난달(10월) 부동산시장 소비자 심리 지수에 따르면 전국의 <b>주택</b>... ',
    link: 'https://www.idaegu.co.kr/news/articleView.html?idxno=401473',
    org_link: 'https://www.idaegu.co.kr/news/articleView.html?idxno=401473',
    pDate: '2022-11-17 21:34:00',
    title: '<b>주택</b>매매심리지수 83.5…3개월 연속 하락',
    src: 'https://i.pinimg.com/originals/51/ad/15/51ad15e78a926fa725140cb6fdcc9877.jpg',
  },
  {
    cnt: 8,
    description:
      '한국건설산업연구원은 15일 열린 &apos;위기의 <b>주택</b>시장 진단과 대응&apos; 세미나에서 현재의 <b>주택</b>시장이 침체기에 진입했다고 진단했다. 사진은 대구 남구지역 아파트 단지 모습. 전영호기자 현재 <b>주택</b>시장의 침체가 복합위기로... ',
    link: 'https://www.idaegu.co.kr/news/articleView.html?idxno=401474',
    org_link: 'https://www.idaegu.co.kr/news/articleView.html?idxno=401474',
    pDate: '2022-11-17 21:34:00',
    title: '&quot;시장 침체, 복합위기 막아야&quot;',
    thumbnail:
      'https://search.pstatic.net/common/?src=http://post.phinf.naver.net/MjAyMjA5MDZfMTkw/MDAxNjYyNDQ3MDM3MzUw.EmxGLQDiuY6O7fubjC2OM7AudXBVL67EMDFXi2V3mBkg.D-42kcFrF_oARG6Qe0oAvn-DC-vNAzIl28h2xurpaDkg.JPEG/ImUsnYwnFciCVxk-iN7XWEWjDnYk.jpg&type=b150',
    src: 'https://modo-phinf.pstatic.net/20221021_44/16663331222880sWp3_JPEG/mosaHKEiLm.jpeg',
  },
  {
    cnt: 9,
    description:
      '총 인구 이동은 감소했지만 도시 → 농촌 이동 사례 늘어 전국 읍·면당 367명 유입된 셈 <b>주택</b>거래도... 이 같은 농촌 이주 증가와 관련해 연구원은 2019년 말부터 수도권과 광역시의 <b>주택</b> 가격 급등이 영향을 미친... ',
    link: 'https://www.khan.co.kr/local/local-general/article/202211172131005',
    org_link: 'https://www.khan.co.kr/local/local-general/article/202211172131005',
    pDate: '2022-11-17 21:33:00',
    title: '대도시 집값에 눌려 농촌행…작년에만 51만명 이주',
    src: 'https://modo-phinf.pstatic.net/20181111_100/1541897825047z4BcQ_JPEG/mosaB1aL8v.jpeg',
  },
  {
    cnt: 10,
    description:
      '국토교통부는 11일 경기 김포시 마산동, 운양동, 장기동, 양촌읍 일대 731만㎡를 신규 공공<b>주택</b>지구로 지정한다고 발표했다. 2022.11.11 /연합뉴스  4만6천호급 &apos;김포한강2 콤팩트시티(공공<b>주택</b>지구)&apos; 조성이 예고된... ',
    link: 'http://www.kyeongin.com/main/view.php?key=20221117010003234',
    org_link: 'http://www.kyeongin.com/main/view.php?key=20221117010003234',
    pDate: '2022-11-17 21:32:00',
    title: '&apos;5호선 김포연장&apos; 예타 면제 가능성 있을까',
    thumbnail:
      'https://search.pstatic.net/sunny/?src=https://images.adsttc.com/media/images/631f/a20a/115d/8a20/684e/b051/large_jpg/casa-ea-sebastian-arquitectos_5.jpg?1663017495&type=b150',
    src: 'https://d2v80xjmx68n4w.cloudfront.net/members/portfolios/NkbE81652775587.png',
  },
  {
    cnt: 11,
    description:
      '공공임대<b>주택</b>을 연간 2000호 우선 공급하고 전세임대 무상지원 기간을 만 20세 이하에서 만 22세 이하로 확대한다. 이외에도 자립준비청년에게 진로상담과 일자리를 지원하고, 이런 지원 정보를 쉽게 안내받을 수 있도록... ',
    link: 'https://www.khan.co.kr/national/health-welfare/article/202211172127015',
    org_link: 'https://www.khan.co.kr/national/health-welfare/article/202211172127015',
    pDate: '2022-11-17 21:29:00',
    title: '자립준비 청년 수당 5만원 인상…전세임대 무상지원 기간 2년 늘려',
    src: 'http://imgnews.naver.net/image/009/2019/09/04/0004421911_001_20190904112406879.jpg',
  },
  {
    cnt: 12,
    description:
      '이밖의 내부 설계를 보면 전체 <b>주택</b> 유형에 안방 드레스룸, 팬트리가 유상옵션으로 제공되고 있다.... 경기<b>주택</b>도시공사 지구단위계획에 따르면 이곳에는 지난해 분양한 화성동탄2 제일풍경채 퍼스티어... ',
    link: 'http://www.mediapen.com/news/view/771093',
    org_link: 'http://www.mediapen.com/news/view/771093',
    pDate: '2022-11-17 21:28:00',
    title: '동탄 재도약 신호탄?…&apos;동탄 파크릭스&apos; 청약 모집가구 수 달성',
    thumbnail:
      'https://search.pstatic.net/common/?src=http://imgnews.naver.net/image/016/2022/07/07/20220707000574_0_20220707135702340.jpg&type=b150',
    src: 'http://shop1.phinf.naver.net/20221016_138/1665896951098dgrCq_JPEG/67032839809176737_735230439.jpg',
  },
  {
    cnt: 13,
    description:
      '한편, 예천군농업기술센터는 매년 국화·우리꽃 작품전시회를 열고 있으며 생활 속 녹색환경 조성을 위해 관내 공동<b>주택</b> 주민들을 대상으로 베란다 텃밭 가꾸기 교육과 생활원예 체험교육을 실시하는 등 생활 속... ',
    link: 'https://www.dkilbo.com/news/articleView.html?idxno=382531',
    org_link: 'https://www.dkilbo.com/news/articleView.html?idxno=382531',
    pDate: '2022-11-17 21:27:00',
    title: '예천군, 농촌관광 교육 치유 농업 활성화 앞장',
    src: 'https://images.adsttc.com/media/images/631f/a20a/115d/8a20/684e/b051/large_jpg/casa-ea-sebastian-arquitectos_5.jpg?1663017495',
  },
  {
    cnt: 14,
    description:
      '올해 동반성장지원단 활동결과 우수 협력사로는 공동기술개발 분야에서 공동<b>주택</b> 리모델링 프로젝트 환기장치를 개발한 `아이디에이이엔씨`와 초저온 LNG 배관 서포트 국산화 제품을 개발한 `유니스 HKR`, 포스코 강관을... ',
    link: 'https://www.dkilbo.com/news/articleView.html?idxno=382566',
    org_link: 'https://www.dkilbo.com/news/articleView.html?idxno=382566',
    pDate: '2022-11-17 21:26:00',
    title: '포스코건설, 동반성장지원단 우수 협력사 선정',
    thumbnail:
      'https://search.pstatic.net/common/?src=http://imgnews.naver.net/image/5239/2022/10/03/792666_image_1_20221003070802545.jpg&type=b150',
    src: 'http://post.phinf.naver.net/MjAyMjA2MjRfMjY3/MDAxNjU2MDMxNTU4ODUw.QIZnVK1EGc6ZjID2JZMe7T-q-N08ApZcgSy4D0ZlE5Mg.w1RUSfD48RmZdi7oTgzAJmlMJpJz3QbinPihZX11OuUg.JPEG/Ios-E_mS516BIjvV2mKZgf___hZI.jpg',
  },
  {
    cnt: 15,
    description:
      '상반기 <b>주택</b>시장 전망&apos; 설문조사를 한 결과(표본 오차는 95% 신뢰수준에 ±2.35%포인트)에 따르면 응답자의 65.4%(1천136명)는 <b>주택</b> 매매가가 하락할 것으로 내다봤다. 이는 2008년 관련 조사를 실시한 이래 가장 높은... ',
    link: 'https://www.idaegu.co.kr/news/articleView.html?idxno=401467',
    org_link: 'https://www.idaegu.co.kr/news/articleView.html?idxno=401467',
    pDate: '2022-11-17 21:24:00',
    title: '국민 열 중 여섯 &quot;내년 집값 떨어질 것&quot;',
    src: 'http://imgnews.naver.net/image/025/2020/03/18/0002985041_001_20200318095703623.jpg',
  },
  {
    cnt: 16,
    description:
      '기호일보 - 아침을 여는 신문, KIHOILBO 내년 상반기에도 <b>주택</b> 매매 가격이 하락할 것이라는 전망이 지배적인 것으로 나타났다. 부동산R114가 10월 31일부터 11월 14일까지 전국 1천738명을 대상으로 &apos;2023년 상반기 <b>주택</b>... ',
    link: 'http://www.kihoilbo.co.kr/news/articleView.html?idxno=1004326',
    org_link: 'http://www.kihoilbo.co.kr/news/articleView.html?idxno=1004326',
    pDate: '2022-11-17 21:20:00',
    title: '내년 상반기 <b>주택</b>시장 하락 전망 &apos;역대급&apos;',
    thumbnail:
      'https://search.pstatic.net/common/?src=http://post.phinf.naver.net/MjAyMjA1MDlfMTU0/MDAxNjUyMDc3MzM3NjYx.eGtIdPMgkTqMnbKmfAhe8B812wTJGr48JXQkVoB2IKog.tFp7wTPkC9ujLLX9pHmBSM5MNxJBEgZdlTYJuIsoHx0g.PNG/IxiC162RgEv7OFeDJruwjgbnj8XA.jpg&type=b150',
    src: 'http://post.phinf.naver.net/MjAyMjA2MjRfMjY3/MDAxNjU2MDMxNTU4ODUw.QIZnVK1EGc6ZjID2JZMe7T-q-N08ApZcgSy4D0ZlE5Mg.w1RUSfD48RmZdi7oTgzAJmlMJpJz3QbinPihZX11OuUg.JPEG/Ios-E_mS516BIjvV2mKZgf___hZI.jpg',
  },
  {
    cnt: 17,
    description:
      '기호일보 - 아침을 여는 신문, KIHOILBO LH서울지역본부가 발달장애인 특화 지원<b>주택</b> &apos;다다름하우스&apos; 입주를... 테마형 매임임대<b>주택</b> 방식으로 사업을 추진했는데, 지난해 4월 착공해 다음 달 입주 예정이다. 서울시 은평구... ',
    link: 'http://www.kihoilbo.co.kr/news/articleView.html?idxno=1004369',
    org_link: 'http://www.kihoilbo.co.kr/news/articleView.html?idxno=1004369',
    pDate: '2022-11-17 21:20:00',
    title: '발달장애인 독립·사회생활 &apos;한번에&apos; LH 다다름하우스 53가구 내달 입주',
    src: 'https://d2v80xjmx68n4w.cloudfront.net/members/portfolios/E12GV1651201381.png',
  },
  {
    cnt: 18,
    description:
      '경기지역 관련된 내용으로는 ▶효율적인 기업 유치를 위한 산업 입지법 개정 ▶학령인구 변화를 반영한 <b>주택</b>건설 기준 등에 관한 규정 개정 ▶자연보전권역 난개발 방지를 위한 수도권 정비계획법 개정 ▶합리적인 보상... ',
    link: 'http://www.kihoilbo.co.kr/news/articleView.html?idxno=1004343',
    org_link: 'http://www.kihoilbo.co.kr/news/articleView.html?idxno=1004343',
    pDate: '2022-11-17 21:20:00',
    title: '경기도-국무조정실, 수도권정비계획법 개정 등 규제혁신 과제 해법 논의',
    thumbnail:
      'https://search.pstatic.net/common/?src=http://post.phinf.naver.net/MjAyMjA4MTNfMTAy/MDAxNjYwMzcxOTI1MDQ1.suIZl1uwpMMDUHOV7zoisRFEStYLLcXstA62uIsKqDQg.662X76MKpiNaqpxrWtwZajZzoxqQCSDlvnkLJ_16r6sg.JPEG/ICkr8ql7FTZTQRUNvfHi0BK3wTPA.jpg&type=b150',
    src: 'https://image.ohou.se/i/bucketplace-v2-development/uploads/projects/cover_images/156864919341731741.jpg?w=960&h=640&c=c',
  },
  {
    cnt: 19,
    description:
      '주민대표들은 자치경찰제도에 대한 홍보 활동과 어린이 등하굣길 교통 안전 활동 확대, <b>주택</b>·공원 순찰 강화 같은 생활 밀착형 치안 서비스 필요성을 강조했다. 자율방범대 같은 자치경찰 협력 단체들의 활동이... ',
    link: 'http://www.kihoilbo.co.kr/news/articleView.html?idxno=1004347',
    org_link: 'http://www.kihoilbo.co.kr/news/articleView.html?idxno=1004347',
    pDate: '2022-11-17 21:20:00',
    title: '경기북부자치경찰위원회, 현장 목소리 듣고자 권역별 순회 간담회 마무리',
    src: 'http://post.phinf.naver.net/MjAyMjA4MTFfMTc2/MDAxNjYwMjAxMTMwMzg4.aleksWUwLcsWvbLW-t625AjdC4-8vFTVOxPO9r22Zi8g.OmfL6kgS4c1G99_Z9_b8It2eiMcXSaoY5E5M7PqdT3gg.JPEG/IvQ_Fp7cJ4A9ZTUROdMxRaISJk14.jpg',
  },
  {
    cnt: 20,
    description:
      '경기<b>주택</b>도시공사(김세용)에 대한 청문을 추가로 요청할 방침이다. 도의회 민주당도 &quot;기관장 인선이 너무 지연됐다. 빨리 진행해야 한다&quot;며 &quot;도의회 국민의힘과 협상은 협상대로 진행하되, 우선은 당초 협약에 따라 청문회... ',
    link: 'http://www.kihoilbo.co.kr/news/articleView.html?idxno=1004382',
    org_link: 'http://www.kihoilbo.co.kr/news/articleView.html?idxno=1004382',
    pDate: '2022-11-17 21:20:00',
    title: '맘 급한 道 청문 요청서 불쑥… 도의회 국힘 &apos;보이콧&apos; 응수',
    thumbnail:
      'https://search.pstatic.net/common/?src=https://dbscthumb-phinf.pstatic.net/2765_000_8/20180614183450818_UV6YOS02E.jpg/327180.jpg?type=m4500_4500_fst&type=b150',
    src: 'http://post.phinf.naver.net/MjAyMTExMjJfMTAg/MDAxNjM3NTc3NTkyODk0.-lL1eWEK5i1t4sYSCyb1NIYCkuckWozslUtmdfAxvbMg.Sv6bFXnSSkjwPTlZP0AQCQXJ1k2dcWkHbXiRnFhlQDAg.JPEG/I1YCuJMosqhc60AB4xpmTktWpzqM.jpg',
  },
  {
    cnt: 21,
    description:
      '기호일보 - 아침을 여는 신문, KIHOILBO 경기도의 공공임대<b>주택</b>이 공급자 중심으로 공급하면서 지역별 수요를 반영하지 못했다는 지적이 제기됐다. 경기연구원은 17일 경기도내 공공임대<b>주택</b> 정책을 분석한 &apos;더 많은, 더... ',
    link: 'http://www.kihoilbo.co.kr/news/articleView.html?idxno=1004366',
    org_link: 'http://www.kihoilbo.co.kr/news/articleView.html?idxno=1004366',
    pDate: '2022-11-17 21:20:00',
    title: '공공<b>주택</b> 세대·지역별 맞춰 공급을',
    thumbnail:
      'https://search.pstatic.net/sunny/?src=https://img.peterpanz.com/photo/20220706/13166663/62c500e35110d_origin.jpg&type=b150',
    src: 'http://post.phinf.naver.net/MjAyMjA5MjBfMTMw/MDAxNjYzNjU1MjM5Mjk3.h14LAOVCsceAVHr02a3nIxlapv5j9_RTkqh2DdpfU_Qg.BNAzPdE468Hh2M6KO9oVg7r9eO1v0mjVBRJK6xrVg24g.JPEG/I3ESjvCwH1t_ID8KFfmGLm1BvFnA.jpg',
  },
];

export default newsData;
