function Carousel($ct){
    this.init($ct)
    this.bind()
}
Carousel.prototype = {
    init: function($ct){
        this.$ct = $ct
        this.$imgCt = this.$ct.find('.im-ct')
        this.$imgs = this.$ct.find('.im-ct>li')
        this.$frontBtn = this.$ct.find('.front')
        this.$backBtn = this.$ct.find('.back')
        this.$bullets = this.$ct.find('.bullet li')
        this.imgWidth = this.$imgs.width()
        this.imgCount = this.$imgs.length
        this.index = 0
        this.isAnimate = false
        this.$imgCt.prepend(this.$imgs.last().clone())
        this.$imgCt.append(this.$imgs.first().clone())
        this.$imgCt.width((this.imgCount+2)*this.imgWidth)
        this.$imgCt.css('left', -this.imgWidth)
        this.autoPlay()

    },
    bind: function(){
        var _this = this
        this.$frontBtn.on('click',function(){
            _this.playFront(1)
            _this.stopAuto()
        })
        this.$backBtn.on('click',function(){
            _this.playBack(1)
            _this.stopAuto()
        })
        this.$bullets.on('click',function(){
            var index = $(this).index()
            if(_this.index > index){
                _this.playFront(_this.index - index)
            }else{
                _this.playBack(index - _this.index)
            }
        })
    },
    playFront: function(len){
        if(this.isAnimate) return
        this.isAnimate = true
        var _this = this
        this.$imgCt.animate({
            left: '+=' + this.imgWidth*len 
        },function(){
            _this.index-=len
            if(_this.index<0){
                _this.$imgCt.css('left',-_this.imgWidth * _this.imgCount)
                _this.index = _this.imgCount - 1
            }
            _this.setBullet()
            _this.isAnimate = false
        })
    },
    playBack: function(len){
        if(this.isAnimate) return
        this.isAnimate = true
        var _this = this
        this.$imgCt.animate({
            left: '-=' + this.imgWidth*len
        },function(){
            _this.index+=len
            if(_this.index === _this.imgCount){
                _this.$imgCt.css('left',-_this.imgWidth)
                _this.index = 0
            }
            _this.setBullet()
            _this.isAnimate = false
        })
    },
    autoPlay: function(){
        var _this = this
        this.autoClock = setInterval(function(){
            _this.playBack(1)
        },1000)
    },
    stopAuto: function(){
        clearInterval(this.autoClock)
    },
    setBullet: function(){
        this.$bullets.eq(this.index).addClass('active').siblings().removeClass('active')
    }

}
var C1 = new Carousel($('.carousel').eq(0))
var C2 = new Carousel($('.carousel').eq(1))
var C3 = new Carousel($('.carousel').eq(2))




