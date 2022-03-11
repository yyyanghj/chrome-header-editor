<template>
  <main class="bg-zinc-100 p-4 text-zinc-700 w-[360px]">
    <div class="max-h-[800px] overflow-y-auto">
      <div class="bg-white rounded px-4">
        <div
          v-for="rule of rules"
          :key="rule.id"
        >
          <div
            class="flex h-10 w-full items-center justify-center"
          >
            <h3 class="flex-1 mr-6">
              {{ rule.name }}
            </h3>

            <div class="flex ml-auto gap-2 items-center">
              <Switch v-model="rule.enabled"></Switch>

              <div
                class="cursor-pointer flex h-8 text-zinc-400 w-8 items-center  justify-center"
                @click="toggleForm(rule.id)"
              >
                <icon-lucide-chevron-down />
              </div>
            </div>
          </div>

          <div>
            <RuleForm
              v-if="currentEdit === rule.id"
              :rule="rule"
            />
          </div>
        </div>
      </div>
    </div>

    <Button class="mt-4 w-full" @click="addRule">
      Add Rule
    </Button>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RuleForm from './RuleForm.vue'
import { useStorageLocal } from '~/composables/useStorageLocal'
import { Rule } from '~/types'

const currentEdit = ref('')

const rules = useStorageLocal<Rule[]>('rules', [])

function toggleForm(id: string) {
  if (currentEdit.value === id)
    currentEdit.value = ''

  else
    currentEdit.value = id
}

function addRule() {
  rules.value.push({
    name: 'New Rule',
    id: Date.now().toString(),
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
}

</script>
