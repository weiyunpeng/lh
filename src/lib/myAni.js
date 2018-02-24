/**
 * Created by liujinghao on 2017/5/31.
 *     封装一些用到的动画插件
 */
// 首页互动播报
function roll(domid, time) {
    this.dom = domid
    this.interval = time; //刷新间隔时间
    this.$scrollCont = $(this.dom);
    this.ani = function () {
        var that = this;
        that.$scrollCont.find('li:last').clone().prependTo('' + that.dom + ' ul');
        var _first = that.$scrollCont.find('li:first');
        _first.height(0);
        _first.css('opacity', 0);
        _first.animate({height: '41px', opacity:1});
        var _last = that.$scrollCont.find('li:last');
        _last.remove();
        setTimeout(function () {
            that.ani();
        }, that.interval);
    } ,
        this.ani()
}