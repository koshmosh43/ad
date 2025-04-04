/* eslint-disable */
(function (window, document) {

  const audioCtxList = [];
  // 创建一个新的 AudioContext 构造函数
  var AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
  // 保存原始的 AudioContext 构造函数
  const origAudioContext = AudioContext;
  // 重写 AudioContext 构造函数
  Object.defineProperty(window, 'AudioContext', {
    get: function () {
      return function () {
        console.log("mv create audio context")
        // 创建原始的 AudioContext 实例
        var audioCtx = new origAudioContext();
        // 拦截原始的 AudioContext 实例的方法
        // var origSuspend = audioCtx.suspend;
        var origResume = audioCtx.resume;
        // 如果游戏未启动，则暂停音频, 并保存到列表中; 如果游戏是启动状态，则不暂停音频
        if (!window.isGameStarted) {
          audioCtx.suspend();
          audioCtxList.push(audioCtx);
        }
        var resolve;
        const promise = new Promise(r => resolve = r);
        audioCtx.resume = function () {
          // 在启动完成后恢复音频播放
          if (!window.isGameStarted)
            return promise;
          if (resolve) {
            resolve();
            resolve = null;
          }
          return origResume.call(this);
        }
        return audioCtx;
      }
    },
    set: function (v) {
      console.warn("mv AudioContext can not be setter.");
    }
  });

  function gameStartCheck() {
    window.isGameStarted = true;
    for (const audioCtx of audioCtxList) {
      if (audioCtx != null && audioCtx.state == "suspended")
        audioCtx.resume();
    }
    audioCtxList.length = 0;
  }

  if (typeof window.MW_gameStartCheck === 'undefined') {
    window.MW_gameStartCheck = gameStartCheck
  } else {
    console.warn('window.MW_gameStartCheck 不为空')
  }


  return gameStartCheck
})(window, document)