<script setup lang="ts">
interface ApiTreeJSONObj {
  comment: string
  field: string
  options: Array<any>
}

const visible = ref(false)

const JSONData = ref<Array<ApiTreeJSONObj> | null>(null)
const maxTextLength = ref(0)

function getJSONData(data) {
  const regex = /([:：，,\- ]|\b\d\S+|[a-z]\S*)/gi
  const optionSplitStr = [':', '：', ',', '，', '-']
  const excludeOptionText = ['yyyy-MM-dd HH:mm:ss', 'yyyy-MM-dd', 'yyyy-MM-dd hh:mm:ss', 'hh:mm:ss', 'HH:mm:ss']

  JSONData.value = data.map((item) => {
    /*
      item.comment
      字段1      1：test    2：test
      字段1      1test,2test,3test
      字段1，yyyy-MM-dd HH:mm:ss
      1:test 2：test 3：test 4：test
    */
    /* 要知道注释是否存在 : , ：， 数字为先, 文本在后, 这样就需要分割 */
    const matchArr = item.comment.match(regex)
    let comment = ''
    const options: Array<any> = []
    if (matchArr && matchArr.length) {
      const firstMath = matchArr[0]
      comment = item.comment.slice(0, item.comment.indexOf(firstMath))
      const otherText = item.comment.slice(item.comment.indexOf(firstMath)).trim()
      /* 过滤掉时间方面的文本, 因为时间里面带有: */
      if (!excludeOptionText.some(excludeText => otherText.includes(excludeText))) {
        /* 正则匹配相关的文本数组 */
        const otherInfoArr = otherText.match(regex)
        if (otherInfoArr && otherInfoArr.length) {
          otherInfoArr.filter(text => text).forEach((text) => {
            /* 找到第一个分隔符 */
            const splitStr = optionSplitStr.find(str => text.includes(str))
            if (splitStr) {
              const arr = text.split(splitStr).filter(text => text)
              if (arr.length) {
                options.push({
                  label: arr[1],
                  value: arr[0],
                })
              }
            }
          })
        }
      }
    }
    else {
      comment = item.comment
    }
    if (maxTextLength.value < item.field.length) {
      maxTextLength.value = item.field.length
    }
    return {
      comment,
      field: item.field,
      options,
    }
  })
  visible.value = true
}
</script>

<template>
  <div>
    <GetByJSONIcon ipc-key="ApiTree-getTreeByJSONData" @get-j-s-o-n-data="getJSONData" />
  </div>
  <Dialog v-model="visible" title="选择key和label" :area="['50%', '80%']">
    <el-scrollbar class="h-full w-full">
      <p class="color-#666">
        从提供的文件中检测中以下字段信息
      </p>
      <div v-if="JSONData" class="mt-8px">
        <div v-for="(field, index) in JSONData" :key="index" class="mt-8px">
          <span class="mr-8px inline-block" :style="{ width: `${maxTextLength * 8}px` }">{{ field.field }}</span>
          <div class="inline-block">
            <el-input v-model="field.comment" placeholder="输入字段文本" />
          </div>
          <template v-if="field.options.length">
            <div v-for="(option, index) in field.options" :key="index" class="mt-8px" :style="{ 'margin-left': `${maxTextLength * 8 + 8}px` }">
              <span class="mr-8px">{{ option.value }}</span>
              <span>{{ option.label }}</span>
            </div>
          </template>
        </div>
      </div>
    </el-scrollbar>
  </Dialog>
</template>

<style scoped></style>
