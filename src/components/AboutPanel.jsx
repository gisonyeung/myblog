import React from 'react';
import { Link } from 'react-router';

const AboutPanel = React.createClass({

  render() {
    return (
      <div className="article-main">
        <div className="about-panel shadow-1">
          <h1 className="panel-title">关于我<span className="emoji">🎀</span></h1>
          <div className="ab-content">
            <div className="introduction">
              <p><strong>杨子聪</strong>，1996年，家乡惠州，本科，毕业于广东工业大学，现供职于<strong>腾讯</strong>。</p>
              <p>性格外向健谈，乐观向上，日常喜欢写写字。</p>
              <p>广东工业大学2018届软件工程学生，学院工作室<strong>计算机工程研发中心</strong>前端组成员。</p>
              <p>在工作上，我习惯苛求每一个细节，在自己能力范围内把事情做得最好，不曾敷衍，因为热爱。</p>
            </div>
            <div className="ab-section exp">
              <h2 className="sub-title">大学经历</h2>
              <div className="cont">
                <div className="item clearfix">
                  <p className="time">2014年9月</p>
                  <div className="item-cont">
                    <h3>入读广东工业大学</h3>
                    <p>大学城校区 计算机学院 软件工程4班</p>
                  </div>
                </div>
                <div className="item clearfix">
                  <p className="time">2014年10月</p>
                  <div className="item-cont">
                    <h3>加入计算机学院团委宣传部</h3>
                    <p>学习设计知识和相关工具的使用，参与社团与学院海报传单的制作</p>
                  </div>
                </div>
                <div className="item clearfix">
                  <p className="time">2015年7月</p>
                  <div className="item-cont">
                    <h3>加入计算机工程研发中心前端组</h3>
                    <p>通过工作室为期两个月的前端技能考核，正式加入研发，暑假留校学习前端</p>
                  </div>
                </div>
                <div className="item clearfix">
                  <p className="time">期间</p>
                  <div className="item-cont">
                    <h3>学习使用各类框架、构建工具及前端理论知识</h3>
                    <p>Bootstrap、Sass、Angular、Grunt、React、Node、Webpack、Mongoose</p>
                  </div>
                </div>
                <div className="item clearfix">
                  <p className="time">期间</p>
                  <div className="item-cont">
                    <h3>参与工作室项目开发、承接商业外包项目</h3>
                    <p>
                      独立开发：
                      <a href="https://gisonyeung.github.io/passabird/index.html" target="_blank">考个鸟</a>
                      、
                      <a href="https://gisonyeung.github.io/rdc/index.html" target="_blank">工作室招新官网</a>
                      、
                      <a href="https://gisonyeung.github.io/xlqy/index.html" target="_blank">《仙侣奇缘2》游戏私服官网</a>
                      、
                      <a href="http://www.ftindustry.com/index" target="_blank">夫天官网</a>
                      、ESMS延锋 WebApp开发、中国邮政 WebApp开发、Envision远景 WebApp开发 等
                    </p>
                    <p>
                      团队开发：中国南方电网后台管理系统
                    </p>
                  </div>
                </div>
                <div className="item clearfix">
                  <p className="time">期间</p>
                  <div className="item-cont">
                    <h3>负责工作室招新官网设计与搭建、海报设计和宣讲会前端组宣讲工作</h3>
                    <p>4月份，进行工作室15级招新官网的设计和搭建、招新海报和传单的设计、宣讲会前端组的宣讲负责</p>
                  </div>
                </div>
                <div className="item clearfix">
                  <p className="time">2016年7月</p>
                  <div className="item-cont">
                    <h3>应聘学院16级新生助班</h3>
                    <p>通过年级辅导员的面试，任职16级软件4班助班</p>
                  </div>
                </div>
                <div className="item clearfix">
                  <p className="time">2016年7月</p>
                  <div className="item-cont">
                    <h3>搭建个人博客</h3>
                    <p>经过三个月的筹备，开始着手搭建个人博客，独立完成个人博客的设计、前端和后台开发</p>
                  </div>
                </div>
                <div className="item clearfix">
                  <p className="time">2016年12月</p>
                  <div className="item-cont">
                    <h3>阿里巴巴移动事业群-UC 实习生</h3>
                    <p>2016年12月27日进入 UC 实习，次年3月离职</p>
                  </div>
                </div>
                <div className="item clearfix">
                  <p className="time">2017年7月</p>
                  <div className="item-cont">
                    <h3>腾讯 正式员工</h3>
                    <p>2017年7月2日进入腾讯（深圳）SNG 实习，毕业后转正入职</p>
                  </div>
                </div>


              </div>
            </div>
            <div className="ab-section info">
              <h2 className="sub-title">其他资料</h2>
              <div className="cont">
                <div className="row">
                  <p className="key">邮箱</p>
                  <p className="value"><a href="mailto:gisonyeung@gmail.com" target="_blank">gisonyeung@gmail.com</a></p>
                </div>
                <div className="row">
                  <p className="key">所在地</p>
                  <p className="value">深圳市南山区科技中一路万利达大厦6F</p>
                </div>
                <div className="row">
                  <p className="key">GitHub</p>
                  <p className="value"><a href="https://github.com/gisonyeung" target="_blank">https://github.com/gisonyeung</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }

});

export default AboutPanel;