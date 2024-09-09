<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useContextStore, useThemeStore } from '@/stores';
import { geUserInfo } from '@/api';
import SvgArrow from '@/assets/svg/arrow.svg';

const { t } = useI18n();
const { context } = storeToRefs(useContextStore());
const { currentThemeData } = storeToRefs(useThemeStore());
const { updateContext } = useContextStore();

const usernameValue = ref('');

geUserInfo();
</script>

<template>
  <view class="app-examples" :style="currentThemeData">
    <h3>Icon 使用展示</h3>
    <view class="app-examples__content">
      <i-ant-design-caret-down-outlined />
    </view>
    <h3>Svg 使用展示</h3>
    <view class="app-examples__content">
      <SvgArrow style="width: 24rpx; height: 24rpx" />
    </view>
    <h3>I18n 国际化使用展示</h3>
    <view>{{ t('This is an example') }}</view>
    <h3>状态管理示例</h3>
    <view class="app-examples__content">
      <input v-model="usernameValue" style="border: 4rpx solid green" placeholder="请输入用户名" />
      <button @click="updateContext({ userInfo: { username: usernameValue } })">点击更新用户名</button>
      <p style="font-size: 32rpx">
        当前 username 是:
        <strong>
          {{ context?.userInfo?.username || '未设置用户名' }}
        </strong>
      </p>
    </view>
    <h3>使用动态主题</h3>
    <view class="app-examples__content">
      <view style="color: var(--primary-color, #212121)">这段文本使用了主题色</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.app-examples {
  padding: 16rpx 32rpx;
  h3 {
    margin: 16rpx 0;
  }
  &__content {
    padding: 32rpx;
    background-color: #f5f5f5;
  }
}
</style>
