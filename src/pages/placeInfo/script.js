import axios from "axios";
import { PLAGE } from "@/utils/Interface";
import utils from '@/utils/utils';

export default {
    name: "placeInfo",
    data() {
        return {
            baseInfo: {},
            contract:{}
        };
    },
    created() {
        // let { item } = this.$route.query;
        
    },
    activated(){
        let { item } = this.$route.query;
        if(item.placeId){
            utils.storage.setLocal('placeId',item.placeId);
        };
        this.getPlace(utils.storage.getLocal('placeId'))
    },
    methods: {
        toTerPage() {
            // let  id  = this.$route.query.item.placeId;
            this.$router.push({ name: "Terminal", query:  String(utils.storage.getLocal('placeId')) });
        },
        async getPlace(id){
            let data = await axios({
                url:PLAGE+'/'+id,
                headers: {
                    authorization: utils.storage.getLocal("authorization")
                  }
            })
            this.baseInfo=data.data.data.baseInfo;
            this.contract=data.data.data.contract;
        }
    }
};