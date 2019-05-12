import Vue from 'vue'
import { VChart, VLine, VArea, VBar, VPie, VPoint, VScale, VAxis, VGuide, VTooltip, VLegend} from 'vux'
import { Button, Field } from 'mint-ui'
import VueProgressBar from 'vue-progressbar';
import '@/directive/required'
/**Mint-UI */
Vue.component('Input', Field);
Vue.component(Button.name, Button);
// vux v-charts
Vue.component('v-chart', VChart)
Vue.component('v-line', VLine)
Vue.component('v-area', VArea)
Vue.component('v-bar', VBar)
Vue.component('v-pie', VPie)
Vue.component('v-point', VPoint)
Vue.component('v-scale', VScale)
Vue.component('v-axis', VAxis)
Vue.component('v-guide', VGuide)
Vue.component('v-tooltip', VTooltip)
Vue.component('v-legend', VLegend)
Vue.component('v-guide', VGuide)

/**自定义组件 */
Vue.component('RefreshButton', () => import('@/component/RefreshButton.vue'));
Vue.component('AnimateNumber', () => import('@/component/AnimateNumber.vue'));
Vue.component('SearchBar', () => import('@/component/SearchBar.vue'));
Vue.component('Search', () => import('@/component/Search.vue'));
Vue.component('LoadingBox', () => import('@/component/LoadingBox.vue'));
Vue.component('SearchInput', () => import('@/component/SearchInput/index.vue'))
Vue.component('NotDataTip', () => import('@/component/NotDataTip'))
Vue.component('Card', () => import('@/component/Card'))
Vue.component('TagList', () => import('@/component/TagList'))
Vue.component('TimeStep', () => import('@/component/TimeStep'))
Vue.component('Scrolls', () => import('@/component/Scrolls'))
Vue.component('ActionItem', () => import('@/component/action/ActionItem'))
Vue.component('IButton', () => import('@/component/action/ibutton'))
Vue.component('Cell', () => import('@/component/Form/Cell'))
Vue.component('YlTreeItem', () => import('@/component/TreeItem/index.vue'))
Vue.component('Form', () => import('@/component/Form/Form'))
Vue.component('City', () => import('@/component/Form/City'))
Vue.component('PickupMap', () => import('@/component/PickupMap'))
Vue.component('PersonCell', () => import('@/component/Person/PersonCell'))
Vue.component('BankCell',()=>import('@/component/Bank/BankCell'))
Vue.component('PlaceCell', () => import('@/component/Person/PlaceCell'))
Vue.component('TerminalCell', () => import('@/component/Person/TerminalCell'))
Vue.component('BusinCell', () => import('@/component/Form/BusinCell'));
Vue.component('Tag', () => import('@/component/Tag'));
Vue.component('ImageCell', () => import('@/component/ImageCell/ImageCell'))
Vue.component('picPreview', () => import('@/component/picPreview'))
Vue.component('Row', () => import('@/component/Row'));
Vue.component('DateRange', () => import('@/component/Form/DateRange'));
Vue.component('FyPopup', () => import('@/component/Popup'));

/**第三方组件 */
Vue.component('Drawer', () => import('@/component/Drawer'));
Vue.use(VueProgressBar, {
    color: '#09BB07',
    failedColor: '#f44336',
    thickness: '3px',
    autoRevert: false,
    location: 'top',
});

Vue.use(require('vue-wechat-title')); //实例化参数
