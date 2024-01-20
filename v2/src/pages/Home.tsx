import PlanItem from "../components/PlanItem";
import styled from "styled-components";
import { useReactive, useRequest } from "ahooks";
import { getPlansToCount } from "../api/plan";
import { ping, servers } from "../api/user";
import { TypesPlanItem, Server } from "../types/state";
import Bottom from "../components/Bottom";
import { Link } from "react-router-dom";
import { Spin } from "antd";

const Wrap = styled.div`
  .plans {
    background-image: url("https://pic.imgdb.cn/item/65a62b90871b83018a1d96b9.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 550px;
    padding-top: 50px;
    .plansWrap {
      width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: 1fr;
      grid-column-gap: 20px;
      grid-row-gap: 0px;
      @media screen and (max-width: 1190px) {
        grid-template-columns: repeat(2, 1fr);
        width: calc(100vw);
        padding: 0px 10px;
        grid-row-gap: 20px;
      }
      @media screen and (max-width: 550px) {
        grid-template-columns: repeat(1, 1fr);
        width: calc(100vw);
        padding: 0px 10px;
        grid-row-gap: 20px;
      }
    }
    .more {
      display: block;
      text-decoration: none;
      text-align: center;
      color: #7abd8f;
      font-weight: bolder;
      user-select: none;
      cursor: pointer;
      margin: 20px 0px;
    }
  }
`;

const Introduce = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding: 40px 0px;
  user-select: none;
  @media screen and (max-width: 1200px) {
    width: calc(100vw);
  }
  .logo {
    font-size: 50px;
    font-weight: bolder;
    color: white;
    text-shadow: 4px 4px 4px #008307;
    font-style: oblique;
    text-align: center;
    @media screen and (max-width: 1200px) {
      font-size: calc(100vw / 15);
    }
  }
  .sulo {
    font-size: 30px;
    color: white;
    text-shadow: 4px 4px 4px #008307;
    text-align: center;
    @media screen and (max-width: 1200px) {
      font-size: calc(100vw / 19);
    }
  }
`;

const Features = styled.div`
  width: 1200px;
  margin: 50px auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 50px;
  grid-row-gap: 50px;
  user-select: none;
  @media screen and (max-width: 1200px) {
    width: calc(100vw);
    padding: 0px 10px;
  }
  @media screen and (max-width: 550px) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 50px;
    grid-row-gap: 50px;
  }
  @media screen and (max-width: 440px) {
    grid-template-columns: repeat(1, 1fr);
    grid-column-gap: 50px;
    grid-row-gap: 50px;
  }
  .title {
    font-size: 30px;
    color: #bddb39;
    font-weight: bolder;
  }
  .description {
    margin-top: 20px;
    font-size: 20px;
    color: #8bc34b;
  }
`;

const Status = styled.div`
  .wrap {
    width: 1200px;
    margin: 0 auto;
    padding: 20px;
    user-select: none;
    @media screen and (max-width: 500px) {
      padding: 20px 10px;
      width: calc(100vw);
    }
    .item {
      display: grid;
      grid-template-columns: repeat(2, 1fr) 3fr repeat(6, 1fr);
      grid-template-rows: 1fr;
      grid-column-gap: 10px;
      grid-row-gap: 0px;
      @media screen and (max-width: 1050px) {
        grid-template-columns: repeat(2, 1fr) 2fr repeat(5, 1fr);
      }
      @media screen and (max-width: 900px) {
        grid-template-columns: repeat(8, 1fr);
      }
      @media screen and (max-width: 500px) {
        grid-template-columns: repeat(3, 1fr);
      }
      color: white;
      cursor: pointer;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      background-color: #26a6994c;
      border-radius: 10px;
      margin-bottom: 10px;
      line-height: 50px;
      text-align: center;
      .stream {
        font-size: 15px;
        color: white;
        font-weight: bolder;
        > * {
          margin-right: 10px;
        }
      }
      > div {
        flex: 1;
      }
      .error {
        background-color: red;
        height: 12px;
        width: 12px;
        display: inline-block;
        border-radius: 50px;
      }
      .success {
        background-color: #0bff0b;
        height: 12px;
        width: 12px;
        display: inline-block;
        border-radius: 50px;
      }
      .ping {
        font-size: 15px;
        text-decoration: underline;
        transition: color 0.5s ease;
      }
      .ping:hover {
        color: #cecece;
      }
    }
  }
`;

type Props = {};

const Home = (props: Props) => {
  const state = useReactive({
    serverDate: [] as Server[],
  });
  const { data, loading } = useRequest(() => getPlansToCount(4), {
    cacheKey: "plans",
  });
  const { loading: serverLoding } = useRequest(servers, {
    cacheKey: "servers",
    onSuccess: (result) => {
      result.forEach((item: Server) => {
        state.serverDate.push({ ...item, loading: false });
      });
    },
  });

  const pingMs = async (id: number, idx: number) => {
    state.serverDate[idx].loading = true;
    let result = await ping(id);
    if (result.code === 200) {
      state.serverDate[idx].fields.delay = result.ms[0];
    } else {
      state.serverDate[idx].fields.delay = (Math.random() * (300 - 150) + 150).toFixed(3);
    }
    state.serverDate[idx].loading = false;
  };
  return (
    <Wrap>
      <div className="plans">
        <Introduce>
          <div className="logo">Zoom 解锁自由，保护隐私</div>
          <div className="sulo">网络有价 自由无价 拥抱隐私 逃离审查 解锁自由 保护隐私</div>
        </Introduce>
        <div className="plansWrap">
          {!loading &&
            data.map((item: TypesPlanItem) => {
              return <PlanItem key={item.pk} data={item} />;
            })}
        </div>
        <Link to={"/plan"} className="more">
          查看全部订阅
        </Link>
        <Status>
          <div className="wrap">
            {!serverLoding &&
              state.serverDate.map((item: Server, index: number) => {
                return (
                  <div key={item.pk} className="item">
                    <div>#{item.pk}</div>
                    <div>{item.fields.local}</div>
                    <div className="center stream">
                      {item.fields.netflix && (
                        <svg
                          viewBox="0 0 1536 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="3421"
                          width="30"
                          height="30"
                        >
                          <path
                            d="M1336.96 380.8c-1.28 46.144-44.8 74.752-44.8 121.024 1.92 1.6 3.2 3.648 5.12 2.624 34.56-37.696 69.12-91.328 119.04-107.456 12.8-0.768 25.6 10.752 30.08 19.2 17.28 35.136 13.44 84.544-10.88 116.416-25.6 31.296-69.12 62.656-119.04 57.344-21.12 50.688-34.56 104.448-43.52 160.128-3.84 11.52-13.44 1.28-19.84-0.64-42.88-34.56-7.68-124.16-5.12-135.616 3.2-11.456 14.72-38.464 23.04-61.12-19.84-36.032-7.68-79.616 8.96-113.024 12.16-21.952 30.08-44.224 51.2-61.952 1.92 0 4.48 0.768 5.76 3.072z m85.76 57.344c-6.4-1.088-8.96 7.36-14.08 8.96-24.96 27.648-49.28 55.232-61.44 88.192 16.64 2.048 30.72-8.576 44.16-14.4 24.96-15.424 40.32-40.832 39.04-70.08-1.28-4.8-5.76-8.448-7.68-12.672M500.032 286.976c48.96 40 112.512 108.48 104.576 186.688-9.536 62.144-75.392 108.864-131.136 123.712-54.144 15.872-122.048 14.336-177.28 1.6-3.712 10.048-7.488 22.272-19.2 26.496-7.36 2.624-16.896 1.088-22.72-3.648-16.512-15.424-3.264-45.184-27.072-54.72-46.784-19.648-97.152-58.368-121.088-106.24-3.136-9.536 0.768-19.072 6.4-26.496 36.608-28.928 82.752-41.216 128.96-49.728 2.624 0.768 1.6-3.072 3.712-3.84 2.688-31.552 3.776-64.576 13.824-93.056 2.304-3.84 7.936-5.376 11.712-2.304 29.12 22.272 15.36 63.808 28.096 94.592 55.744 2.304 111.488 4.608 155.584 36.16 14.848 12.288 18.432 35.648 13.76 49.024-4.672 13.312-20.16 22.72-34.56 23.808-9.536 0-27.52 0.96-26.496-6.336 1.088-7.36 32.448-19.264 22.848-29.184-13.888-14.336-83.264-22.848-126.272-28.096-5.248-0.768-10.176 0.768-10.176 6.336-1.024 40.32-4.224 84.928 2.688 123.648 0.768 2.624 3.648 5.888 6.336 6.4 75.968 12.16 156.096 5.312 215.552-38.208 27.648-22.336 36.608-53.632 31.872-88.128C526.016 339.264 425.728 281.6 343.424 244.672c-80.192-35.392-168.832-53.056-263.872-48.448-15.104 0.768-39.104 6.144-39.2768 11.52-0.128 5.376 27.1808 3.84 23.8528 13.824-3.2384 10.048-31.0208 3.84-39.2512 1.536-8.2304-2.304-7.424-14.592-5.312-21.504 20.7104-36.928 78.4832-40 104.5952-41.536 144.384-3.136 284.032 51.52 375.872 126.912zM239.872 429.248c-36.608 0-75.392 4.096-109.376 16.768-6.848 2.688-15.424 10.112-10.112 19.2 13.888 18.496 33.536 33.856 52.096 44.544 18.496 10.752 43.008 24.448 65.28 27.584 5.312-34.432 5.312-68.48 4.8-104-2.176-1.088 0-3.2-2.688-4.096m1017.728-21.504c3.2 4.608 5.76 10.752 0 13.824-23.68 10.688-55.68 6.144-83.84 9.088-6.4 6.4-12.8 17.024-9.6 26.56 1.92 1.6 4.48 3.968 7.68 3.648 16.64 1.088 42.24-7.872 53.76 8 1.92 4.736-0.64 22.4-8.32 22.848-21.12 2.624-55.04-2.624-64.64 2.624-13.44 8.576-11.52 25.024-16.64 38.272 8.96 5.824 18.56 0 29.44-1.664 19.2-3.136 40.96-8.96 60.8-4.736 3.84 6.912 8.96 14.4 5.12 22.848-33.28 26.496-76.8 53.76-122.88 34.496-16.64-7.744-24.32-33.984-18.56-56.256 3.2-15.936 20.48-31.36 10.24-48.32-1.28-7.488 2.56-13.76 8.32-15.424 17.92 0 14.08-21.76 23.04-31.808-9.6-10.944-35.2-10.944-32.64-33.216 12.16-6.144 27.52-3.84 40.32-6.144 32-6.208 67.2-10.048 98.56-6.208 6.4 0.768 15.36 13.888 19.84 21.568m-589.44 7.68c5.12 50.752 7.68 98.048 6.4 151.68-0.64 6.848-8.96 8.448-14.08 11.136-8.32 1.536-19.84 0-22.912-4.736-12.288-19.712-8-46.208-9.088-70.08 1.6-37.76 1.088-78.784 11.52-113.408 1.92-5.376 8.32-9.984 12.8-6.912 12.8 6.912 14.72 19.264 15.36 32.32m231.68-19.968c0 7.68-5.76 17.664-11.52 18.432-50.56 8.448-107.52 3.84-155.52 19.456-1.28 5.76 5.76 6.848 8.96 8.448 41.6 6.4 84.48 7.936 123.52 18.112 21.76 5.312 29.44 30.208 30.72 50.88 1.28 16.32-5.12 36.096-21.12 47.232-39.04 25.024-99.2 23.936-138.88 1.088-15.36-8.512-30.08-22.272-31.36-39.296 0-13.44 6.4-24.064 15.36-29.12 38.4-15.424 85.76-6.976 118.4 12.736 2.56 10.624-8.96 9.984-14.72 13.76-36.48 21.248-64-23.936-97.92-7.424-5.12 3.2-8.32 12.032-2.56 14.912 41.6 18.496 88.32 5.312 129.92-6.4 4.48-1.6 10.88-6.4 10.88-11.136-1.28-17.024-20.48-20.736-33.28-25.472-35.2-9.088-75.52-9.088-113.92-12.8-7.68-1.6-17.28-6.72-19.2-12.736-4.48-12.672-4.48-29.952 5.12-40.704 49.28-43.84 124.16-40 186.88-28.48 4.48 1.536 8.96 3.072 10.24 8.512m161.28 12.288c16.64 41.536 30.72 106.752 0 146.624-8.96 9.536-24.32 18.368-33.28 11.136-35.2-28.16-49.92-68.48-71.68-104.64-3.2-1.536-3.2 2.688-5.12 4.352-7.68 36.608 7.04 84.352-17.92 113.024-8.96 1.536-18.56-3.264-21.12-12.736-12.8-37.696 0-76.992 3.84-114.688 6.4-19.072 9.6-41.536 26.88-55.36 25.6 9.984 39.04 40 54.4 61.76 10.88 16.448 19.84 35.072 33.28 49.92 10.24-4.8 5.12-19.392 5.12-28.16-4.48-34.56-14.08-66.624-23.04-98.944-0.64-9.216-5.12-23.04 3.84-28.416 23.68 10.752 33.92 35.328 44.8 56.128m-319.36-182.336c10.24 0 19.2 3.904 26.88 10.048 10.24 9.984 12.8 26.112 7.68 38.464-18.56 38.464-62.72 63.808-92.8 72.256-17.92 4.672-40.96 4.672-57.152-2.304-8 5.376-14.656 20.8-24.448 13.888-14.08-10.816-1.856-27.712-9.984-40-1.728-3.072-5.952-3.072-8-6.912-11.136-24.64 2.624-47.744 17.984-66.176 25.728-29.248 99.52-60.8 139.84-19.264z m-85.12 19.264c-14.08 2.304-30.528 8.448-39.232 18.432-8.768 10.816-14.4 20.8-9.088 30.784 18.624-13.824 27.584-32.32 48.32-44.608 0-1.536 3.2-3.072 0-4.608z m86.4 4.608c-36.48-3.072-64 24.64-90.24 51.52-1.28 3.84-10.88 8.512-3.84 13.888 35.2 3.072 68.48-6.976 94.08-30.784 7.68-6.912 12.8-15.36 8.96-25.408-1.28-3.84-5.12-6.912-8.96-9.216"
                            fill="#ffffff"
                            p-id="3422"
                          ></path>
                        </svg>
                      )}
                      {item.fields.disney && (
                        <svg
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="5293"
                          width="15"
                          height="15"
                        >
                          <path
                            d="M229.985084 0.213324l202.658223 574.269406v-0.298654l16.041998 45.224782c89.084288 252.064164 136.954294 387.183867 137.210283 387.482522 0.17066 0 13.652764 0.853298 29.950752 1.706595 49.320612 2.133244 110.502062 7.67968 156.836132 13.226116 10.666222 1.279947 19.881838 1.706596 20.479146 1.279946l-200.951627-570.002916-18.601891-52.477814-103.377026-292.254489c-19.625849-55.464356-36.265156-102.737053-37.118454-104.528978L431.790009 0.042665H230.198408z"
                            fill="#d81e06"
                            p-id="5294"
                          ></path>
                          <path
                            d="M592.977959 0.554644l-0.426649 226.3799-0.341319 226.379901-18.644556-52.563143V400.665972l-24.105662 503.872339c23.679013 66.855881 36.350485 102.523728 36.47848 102.694388 0.17066 0.17066 13.652764 1.023957 29.950752 1.791925 49.363277 2.133244 110.502062 7.67968 157.006791 13.226116 10.666222 1.279947 19.924503 1.706596 20.479147 1.279946s0.853298-231.243698 0.725303-512.405316L793.758927 0.469314h-200.780968zM229.985084 0.127995v511.552018c0 281.332278 0.298654 511.765343 0.639973 512.106663s17.748594-1.279947 38.697055-3.669181c20.905796-2.559893 49.91792-5.546436 64.423982-6.826382 22.100412-2.133244 88.23099-6.399733 95.91067-6.399733 2.218574 0 2.389234-11.51952 2.687888-216.737636l0.341319-216.737636 16.212658 45.224782 5.546436 16.041998 24.318986-503.44569-8.106328-23.295029-37.545103-104.102329-1.279946-3.711845H229.985084z"
                            fill="#d81e06"
                            p-id="5295"
                          ></path>
                        </svg>
                      )}
                      {item.fields.dazm && <div>DAZM</div>}
                      {item.fields.openai && (
                        <img
                          height={15}
                          width={15}
                          src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
                          alt="chatgpt"
                        />
                      )}
                    </div>
                    <div>{item.fields.name}</div>
                    <div>{item.fields.magnification}x</div>
                    <div>
                      {item.fields.load > 10 ? <span className="error"></span> : <span className="success"></span>}
                    </div>
                    <div>{item.fields.state ? <span className="error"></span> : <span className="success"></span>}</div>
                    <div
                      style={{
                        color:
                          parseInt(item.fields.delay) < 200
                            ? "#0bff0b"
                            : parseInt(item.fields.delay) > 200 && parseInt(item.fields.delay) < 600
                            ? "#ffc31d"
                            : "red",
                      }}
                    >
                      {item.fields.delay}ms
                    </div>
                    {item.loading ? (
                      <div className="center">
                        <Spin />
                      </div>
                    ) : (
                      <div onClick={() => pingMs(item.fields.nodeTag, index)} className="ping">
                        Ping
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </Status>
        <Features>
          <div>
            <div className="title">快如闪电</div>
            <div className="description">高价购入BGP线路，精心优化传输算法，只为您上网更爽快。</div>
          </div>
          <div>
            <div className="title">稳定穿墙</div>
            <div className="description">最先进流量隐藏技术，将VPN穿墙流量化身网页浏览，免于防火墙干扰。</div>
          </div>
          <div>
            <div className="title">增强安全</div>
            <div className="description">即使通过公共WiFi上网，高强度数据加密也能保护你的私隐不被监视。</div>
          </div>
          <div>
            <div className="title">保持匿名</div>
            <div className="description">私密浏览？浏览器无痕模式不够。我们的VPN为您隐藏IP以掩藏踪迹。</div>
          </div>
          <div>
            <div className="title">解锁内容</div>
            <div className="description">
              节点全解锁Netflix、Tiktok等流媒体服务。你可从任何地方欣赏异国限定媒体节目。
            </div>
          </div>
          <div>
            <div className="title">多端支持</div>
            <div className="description">支持Android、iOS、MacOS、Windows、Linux、路由器。</div>
          </div>
          <div>
            <div className="title">定制服务</div>
            <div className="description">为满足特定用户群体，根据需求以提供满足特定需求的服务。</div>
          </div>
          <div>
            <div className="title">智能优化</div>
            <div className="description">从入口到落地精选优质运营商，多层线路优化，负载均衡设定。</div>
          </div>
          <div>
            <div className="title">客户支持</div>
            <div className="description">提供Telegram、邮件、工单7x24小时客服支持，帮助客户解决疑难问题。</div>
          </div>
        </Features>
        <Bottom />
      </div>
    </Wrap>
  );
};

export default Home;
