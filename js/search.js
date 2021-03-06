! function () {
    var e = Handlebars.template,
        a = Handlebars.templates = Handlebars.templates || {};
    a.cdnjs = e(function (e, a, n, t, s) {
        function r(e, a, t) {
            var s, r = "";
            return r += '\n    <tr class="version">\n        <td class="versionlabel">', (s = n.version) ? s = s.call(e, {
                hash: {},
                data: a
            }) : (s = e.version, s = typeof s === c ? s.apply(e) : s), r += p(s) + "</td>\n    </tr>\n    ", s = n.each.call(e, e.files, {
                hash: {},
                inverse: u.noop,
                fn: u.programWithDepth(2, o, a, e, t),
                data: a
            }), (s || 0 === s) && (r += s), r += "\n"
        }

        function o(e, a, n, t) {
            var s, r = "";
            return r += '\n        <tr class="library">\n            <td>\n                <input type="text" class="input-block-level" style="margin: 0" readonly value="//cdnjs.cloudflare.com/ajax/libs/' + p((s = t.name, typeof s === c ? s.apply(e) : s)) + "/" + p((s = n.version, typeof s === c ? s.apply(e) : s)) + "/" + p(typeof e === c ? e.apply(e) : e) + '">\n            </td>\n        </tr>\n    '
        }
        this.compilerInfo = [3, ">= 1.0.0-rc.4"], n = n || e.helpers, s = s || {};
        var l, i = "",
            c = "function",
            p = this.escapeExpression,
            u = this;
        return l = n.each.call(a, a.assets, {
            hash: {},
            inverse: u.noop,
            fn: u.programWithDepth(1, r, s, a),
            data: s
        }), (l || 0 === l) && (i += l), i += "\n"
    })
}(), $("#example").dataTable({
    sDom: "<'row'<'span12'f>r>t<'row'<'span6'i><'span6'p>>",
    sPaginationType: "bootstrap",
    bPaginate: !1,
    oLanguage: {
        sLengthMenu: "_MENU_ records per page"
    }
}), $("input[readonly]").on("mouseenter", function () {
    $(this).select()
});
var packages = null,
    template = null;
$(document).ready(function () {
    $(".btn-version-files").on("click", function (e) {
        e.preventDefault();
        var a = $(e.currentTarget).attr("package-name");
        null == template && (template = Handlebars.templates.cdnjs), $("#LAZY_" + a.replace(".", "")).html(template(load_versions(a))), $(this).siblings(".filesandversions").slideToggle(200), $(this).siblings(".filesandversions").find("input[readonly]").on("mouseenter", function () {
            $(this).select()
        })
    }), load_packages(!0)
}),
function () {
    load_versions = function (e) {
        load_packages(!1);
        for (var a = packages.length, n = 0; a > n; n++)
            if (packages[n].name == e) return packages[n]
    }
}(jQuery),
function (e) {
    load_packages = function (a) {
        null == packages && e.ajax({
            dataType: "json",
            url: "packages.min.json?" + (new Date).getTime(),
            async: a,
            success: function (e) {
                packages = e.packages
            }
        })
    }
}(jQuery);