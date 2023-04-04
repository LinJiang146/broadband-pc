<template>
    <div>
        <div v-for="imgName in imgNameList">
            <img :style="{ width: '100%' }" :src="imgMap.get(imgName)">
        </div>
        
    </div>
</template>
<script>
import downloadImg from '@/api/downloadImg';

export default {
    data() {
        return {
            imgNameList: [],
            imgMap: new Map()
        }
    },
    mounted() {
    },
    methods: {

        getImg(fileName) {
            this.imgNameList = []
            var fileNames = fileName.split(';')
            if(fileNames[fileNames.length-1]==''){
                fileNames.pop()
            }
            
            fileNames.forEach(name => {
                
                if (this.imgMap.get(name)) {
                    this.imgNameList.push(name)
                }
                else {
                    downloadImg(name, 'common/download', img => {
                        this.imgMap.set(name, img)
                        this.imgNameList.push(name)
                    })
                }
            });

        },
    }
}
</script>
<style scoped></style>