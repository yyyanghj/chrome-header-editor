<template>
  <main class="bg-zinc-100 p-4 text-zinc-700 w-[360px]">
    <div class="max-h-[800px] overflow-y-auto">
      <div class="">
        <div
          v-for="rule of rules"
          :key="rule.id"
          class="bg-white rounded mt-2 px-4"
        >
          <div
            class="cursor-pointer flex h-10 w-full items-center justify-center"
            @click="toggleForm(rule.id)"
          >
            <h3 class="flex-1 mr-6 select-none">
              <div class="overflow-ellipsis">
                {{ rule.name }}
              </div>
            </h3>

            <div class="flex ml-auto gap-2 items-center">
              <Switch v-model="rule.enabled"></Switch>

              <div
                class="cursor-pointer flex h-8 text-zinc-400 w-8 items-center  justify-center"
                @click="deteleRule(rule.id)"
              >
                <icon-lucide-trash2 />
              </div>
            </div>
          </div>

          <div v-if="currentEdit === rule.id" class="border-t border-solid border-zinc-300 ">
            <RuleForm
              :rule="rule"
            />
          </div>
        </div>
      </div>
    </div>

    <Button tabindex="-1" class="mt-4 w-full" @click="addRule">
      Add Rule
    </Button>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { sendMessage } from 'webext-bridge'
import RuleForm from './RuleForm.vue'
import { Rule } from '~/types'

const currentEdit = ref('')

const rules = ref<Rule[]>([])

function toggleForm(id: string) {
  if (currentEdit.value === id)
    currentEdit.value = ''

  else
    currentEdit.value = id
}

function addRule() {
  const id = Date.now().toString()

  rules.value.push({
    name: 'New Rule',
    id,
    action: {
      type: 'replace',
      headerName: '',
      headerValue: '',
    },
    matcher: {
      type: '*',
      value: '',
    },
    enabled: true,
  })

  currentEdit.value = id
}

function deteleRule(id: string) {
  rules.value = rules.value.filter(rule => rule.id !== id)
}

onMounted(async() => {
  const data: any = await sendMessage('request-rules', {}, 'background')
  rules.value = data

  watchEffect(() => {
    sendMessage('update-rules', rules.value, 'background')
  })
})

</script>
