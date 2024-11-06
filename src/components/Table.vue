<template>
    <h2 class="p-2 text-center text-bg-danger">
        Vez do: 
        <i class="bi text-primary" :class="{
            'bi-x-lg': step % 2 === 0,
            'bi-circle': step % 2 === 1
        }"></i>
    </h2>
    <div class="row row-cols-3 g-3 mx-auto" style="width: 300px;">
        <template v-for="row in table">
            <Field v-for="field in row" @mark="mark" :field="field" :key="field.id"/>
        </template>
    </div>
</template>

<script setup>
import makeTable from "@/makeTable";
import Field from "./Field.vue"
import {nextTick, ref} from "vue"
import checkTable from "@/checkTable"

const endOfPlay = ref(false)
const step = ref(0)
const table = ref(makeTable())

async function mark(id) {
    if (endOfPlay.value) 
        return

    const row = table.value[Math.floor((id - 1) / 3)]
    const field = row[Math.floor((id - 1) % 3)]

    if (!field.checked) {
        field.checked = true
        field.icon = step.value % 2 === 0 ? 'bi-x-lg' : 'bi-circle'
        step.value++;

        const result = checkTable(table.value)
        console.log(result)

        if (result && result.row) {
            const row = table.value[result.row - 1]
            row.forEach(item => item.background = "text-bg-success")
        } else if (result && result.column) {
            table.value.forEach(row => row[result.column - 1].background = "text-bg-success")
        } else if (result && result.diagonal) {
            if (result.diagonal === "start") {
                table.value[0][0].background = "text-bg-success"
                table.value[1][1].background = "text-bg-success"
                table.value[2][2].background = "text-bg-success"
            } else {
                table.value[0][2].background = "text-bg-success"
                table.value[1][1].background = "text-bg-success"
                table.value[2][0].background = "text-bg-success"
            }
        }

        if (result) {
            endOfPlay.value = true
            setTimeout(() => {
                alert("Fim do jogo.")
                document.location.reload()
            }, 1000)
        }
    }
}

</script>