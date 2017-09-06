<template>
  <div class="account">
    <div class="fields">
      <div class="field">
        <div class="control">
          <input class="input" type="text" placeholder="请输入您的真实姓名">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input class="input" type="text" placeholder="请输入您的身份证号">
        </div>
      </div>
    </div>
    <p class="tip-error">
      <span class="icon icon-error-tip"></span>
      <span>&nbsp;身份证号错误</span>
    </p>
    <p class="tip-msg">确认后不可更改，请填写您的真实身份信息</p>
    <a class="buttons btn-binding binding"></a>
  </div>
</template>